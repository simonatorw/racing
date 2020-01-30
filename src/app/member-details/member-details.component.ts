import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

// This interface may be useful in the times ahead...
interface Member {
  id: number;
  firstName: string;
  lastName: string;
  jobTitle: string;
  team: string;
  status: string;
}

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit, OnChanges, OnDestroy {
  memberModel: Member;
  memberForm: FormGroup;
  submitted = false;
  alertType: String;
  alertMessage: String;
  teams = [];
  id: number;
  memberSubscription: Subscription;
  teamsSubscription: Subscription;
  deleteSubscription: Subscription;
  updateSubscription: Subscription;
  addSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit() {
    //this.id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.route.paramMap.subscribe(pmap => this.id = parseInt(pmap.get('id'), 10));
    //this.id = 0;

    this.memberForm = this.fb.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      jobTitle: new FormControl('', Validators.required),
      team: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required)
    });

    this.teamsSubscription = this.appService.getTeams().subscribe(teams => {
      this.teams = teams;
    });

    if (this.id) {
      this.memberSubscription = this.appService.getMember(this.id).subscribe(member => {
        this.memberModel = member;
        const team = this.teams.find(item => item.teamName === this.memberModel.team);
        if (!team) {
          this.teams.push({ teamName: this.memberModel.team });
        }
        this.memberForm.controls['firstName'].setValue(this.memberModel.firstName);
        this.memberForm.controls['lastName'].setValue(this.memberModel.lastName);
        this.memberForm.controls['jobTitle'].setValue(this.memberModel.jobTitle);
        this.memberForm.controls['team'].setValue(this.memberModel.team);
        this.memberForm.controls['status'].setValue(this.memberModel.status);
      });
    }


  }

  ngOnChanges() {
  }

  onDelete(form: FormGroup) {
    this.memberModel = form.value;
    this.memberModel = { ...this.memberModel, id: this.id };
    this.deleteSubscription = this.appService.deleteMember(this.memberModel).subscribe(response => {
      this.deleteSubscription.unsubscribe();
      this.router.navigate(['/members']);
    });
  }

  // TODO: Add member to members
  onSubmit(form: FormGroup) {
    this.memberModel = form.value;
    if (this.id) {
      this.memberModel = { ...this.memberModel, id: this.id };
      this.updateSubscription = this.appService.updateMember(this.memberModel).subscribe(response => {
        this.updateSubscription.unsubscribe();
        this.router.navigate(['/members']);
      });
    } else {
      this.addSubscription = this.appService.addMember(this.memberModel).subscribe(response => {
        this.addSubscription.unsubscribe();
        this.router.navigate(['/members']);
      });
    }
  }

  ngOnDestroy() {
    if (this.id) {
      this.memberSubscription.unsubscribe();
    }
    this.teamsSubscription.unsubscribe();
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit, OnDestroy {
  members = [];
  subscription: Subscription;

  constructor(public appService: AppService, private router: Router) {}

  ngOnInit() {
    this.subscription = this.appService.getMembers().subscribe(members => (this.members = members));
  }

  goToAddMemberForm() {
    this.router.navigate(['/member-details']);
  }

  editMemberByID(id: number) {}

  deleteMemberById(id: number) {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

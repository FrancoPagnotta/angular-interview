import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { AppService } from 'src/app/services/app.service';

import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  postId: number;
  post: Post = {} as Post;
  commentDateFromChild : string;
  lastCommentate: string;

  constructor(private _activatedRoute: ActivatedRoute,
              private _appService: AppService,
              private _cdRef:ChangeDetectorRef) {}
              
  ngOnInit(): void {

    this._activatedRoute.params.subscribe((res) => {
      this.postId = res.id;
      this.getItem(this.postId);
    });

    this._appService.getComments(this.postId);
  }

    ngAfterViewChecked() {
   this.lastCommentate = this.commentDateFromChild;
  this._cdRef.detectChanges();
  }

  getItem(id: number) {
    this._appService.getListItem(id)
      .subscribe((res: Post) => this.post = res);
  }

  getDate(date: string) {
    this.commentDateFromChild = date;
  }

}

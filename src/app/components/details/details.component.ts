import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
              private _cdRef:ChangeDetectorRef,
              private _router: Router) {}
              
  ngOnInit(): void {

    this._activatedRoute.params.subscribe((res) => {
      if (res.id > 0 && res.id <= 10) {
        this.postId = res.id;
        this.getItem(this.postId);
      } else {
        this._router.navigateByUrl('/404');
      }
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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  postId: any;
  post: any = {};


  constructor(private _activatedRoute: ActivatedRoute,
              private _authService: AppService) { 

    this._activatedRoute.params.subscribe(res => {
      this.postId = res.id;
      this.getItem(this.postId);
    });
    
  }

  ngOnInit(): void {
  }

  getItem(id: number) {
    this._authService.getListItem(id)
      .subscribe(res => this.post = res);
  }

}

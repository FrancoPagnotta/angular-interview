import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  listItems: Array<any> = [];

  constructor(private _appService: AppService,
              private _router: Router) { 

    this._appService.getListItems()
      .subscribe((res: any) => {
        this.listItems = res;
      });
  }

  ngOnInit(): void {}

  viewItem(id: number) {
    this._router.navigate(['/post',id]);
  }

}

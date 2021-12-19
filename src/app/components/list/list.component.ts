import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  listItems: Array<any> = [];

  constructor(private _appService: AppService) { 

    this._appService.getListItems()
      .subscribe((res: any) => {
        this.listItems = res;
        console.log(this.listItems);
      });
  }

  ngOnInit(): void {}

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  public id!: number
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    console.log(this.id,'yo1');
    // this.id = this.route.snapshot.paramMap.get('id')!;
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.id = Number(params.get('id'))!;
        console.log(this.id)
      }
    )
 }
 
}

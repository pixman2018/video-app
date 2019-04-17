import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';


@Component({
  selector: 'fk-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {



  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    
  }

  getSearch( queryObject ) {

    const query = decodeURI(queryObject.search);
    this.router.navigate(['/movie/'], { queryParams : { search : query}});
  }

}

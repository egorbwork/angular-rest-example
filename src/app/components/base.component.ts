import { Component, OnInit }        from '@angular/core';
import { Router }                   from '@angular/router';

@Component({
    selector: 'base-app',
    styles: [
    ],
    template: `
        <div class="main">
            <router-outlet></router-outlet>
        </div>
    `,
})
export class BaseComponent implements OnInit {

    constructor( private router: Router ) { }

    public ngOnInit(): void {
    }
}

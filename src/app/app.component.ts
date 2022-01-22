import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from './services/supabase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularchallenge';
  session = this.supabase.session;

  constructor(private readonly supabase: SupabaseService, private router: Router) { }

  ngOnInit() {
    this.supabase.authChanges((_: any, session: any) => {
      this.session = session;
    
      localStorage.setItem('session', JSON.stringify(session));
      return this.router.navigate(['/']);
    });
  }
}

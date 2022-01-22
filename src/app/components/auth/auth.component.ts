import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  loading: boolean = false;
  session = this.supabase.session;
  constructor(private readonly supabase: SupabaseService) { }
  
  ngOnInit() {    
  }

  async handleLogin(input: string) {
    try {
      this.loading = true;
      await this.supabase.signIn(input);
      Swal.fire(
        '¡Enviado!',
        'Revisa tu correo electronico',
        'success'
      )
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Hay un problema',
        text: `${error.error_description || error.message}`,
      })
    } finally {
      this.loading = false;
    }
  }

}

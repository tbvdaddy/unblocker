//import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.0.0+esm'
// Create a single _supabase client for interacting with your database
const { createClient } = supabase;

const _supabase = createClient(
  'https://hxyegpdslremfvirwunq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4eWVncGRzbHJlbWZ2aXJ3dW5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjM3NzM0NjEsImV4cCI6MTk3OTM0OTQ2MX0.h0EMF5FCpam2-IpzANEozOv1WOQXzGNwI32QyG1ELjE'
)

const { data, error } = await _supabase
  .from('secret')
  .select('id')

console.log(data);
console.log(error);


export async function signIn() {
  if(!(document.getElementById('main').value == '' || document.getElementById('passwd').value == '')){
    const { data, error } = await _supabase.auth.signInWithPassword({
      email: document.getElementById('main').value,
      password: document.getElementById('passwd').value
    })
    const now = new Date();
    const time = now.getTime() + 3600 * 1000;
    now.setTime(time);
    document.cookie = "data=" + data.session.access_token + "; expires=" + now.toUTCString() + "; path=/";
    document.cookie = "refToken=" + data.session.refresh_token + "; expires=" + now.toUTCString() + "; path=/";
    if(error == null || error == '') {
      return '';
    }
  }
  document.getElementById("container").innerHTML = "<div class='container' id='container'> <div class='form-container log-in-container'> <form action='#'> <h1>Login</h1> <!-- <div class='social-container'> <div onclick='signInWithGithub()'> <i class='fa-brands fa-github fa-2xl'></i> </div>				 --> </div> <input type='email' placeholder='Wrong email or password' id='main'/> <input type='password' placeholder='Password' id='passwd'/> <a href='#'>Forgot your password?</a> <button onclick='signIn()'>Log In</button> </form> </div> <div class='overlay-container'> <div class='overlay'> <div class='overlay-panel overlay-right'> <h1>Science Help</h1> <p>Get help with science for free!</p> </div> </div> </div>";
  document.getElementById("main").className = "error";
  console.log("rip");
  return 0;
}

export async function Signup() {
  if(!(document.getElementById('main').value == '' || document.getElementById('passwd').value == '' || document.getElementById('key').value == '') && document.getElementById('passwd').value == document.getElementById('passwdconf').value){
  const { user, session, error } = await _supabase.auth.signUp({
    email: document.getElementById('main').value,
    password: document.getElementById('passwd').value
  },
  {
    data: {
      secret_key: document.getElementById('key').value,
    }
  }
  )
  const now = new Date();
  const time = now.getTime() + 3600 * 1000;
  now.setTime(time);
  document.cookie = "user=" + user + "; expires=" + now.toUTCString() + "; path=/";
  document.cookie = "session=" + session + "; expires=" + now.toUTCString() + "; path=/";
  return error;
} else if(!(document.getElementById('passwd').value == document.getElementById('passwdconf').value)) {
  document.getElementById("container").innerHTML = "<div class='form-container log-in-container'> <form action='#'> <h1>Sign Up</h1> <!-- <div class='social-container'> <i class='fa-brands fa-github fa-2xl'></i>				</div> <span>or use your email</span> --> <input type='email' placeholder='Email' id='main'/> <input type='password' placeholder='Passwords do not match!' id='passwd'/> <input type='password' placeholder='Confirm Password' id='passwdconf'/> <input type='secret' placeholder='Secret Key' id='key'/> <button onclick='Signup1()' type='button'>Sign Up</button> </form> </div> <div class='overlay-container'> <div class='overlay'> <div class='overlay-panel overlay-right'> <h1>Science Help</h1> <p>Get help with science for free!</p> </div> </div> </div>"
  document.getElementById("passwd").className = "error";
  console.log("rip bozo")
} else if(document.getElementById('main').value == '' || document.getElementById('passwd').value == '' || document.getElementById('key').value == '') {
  document.getElementById("container").innerHTML = "<div class='form-container log-in-container'> <form action='#'> <h1>Sign Up</h1> <!-- <div class='social-container'> <i class='fa-brands fa-github fa-2xl'></i>				</div> <span>or use your email</span> --> <input type='email' placeholder='No empty data.' id='main'/> <input type='password' placeholder='Password' id='passwd'/> <input type='password' placeholder='Confirm Password' id='passwdconf'/> <input type='secret' placeholder='Secret Key' id='key'/> <button onclick='Signup1()' type='button'>Sign Up</button> </form> </div> <div class='overlay-container'> <div class='overlay'> <div class='overlay-panel overlay-right'> <h1>Science Help</h1> <p>Get help with science for free!</p> </div> </div> </div>"
  document.getElementById("main").className = "error";
  console.log("rip");
}
}

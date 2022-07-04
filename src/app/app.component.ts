import { Component, OnInit } from '@angular/core';
declare let $:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'testApp';

  ngOnInit(): void 
  {
    $(window).on('load',function()
    {
      
      setTimeout(function()
      {
        $('.loader-wrapper').css({'height':'0'})
        $('.loader-wrapper').css('opacity','0')
      },1000)
    })
  }
}

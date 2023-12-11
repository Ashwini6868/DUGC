import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../services/students.service';
import { LabService } from '../services/lab.service';
import  * as XLSX from 'xlsx';
import { LowerCasePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.css']
})

export class LabComponent implements OnInit {

  courseS:string='22ECSC302';
  ExelData:any;
  selectedType = 0;
  selectedSem = 0;
   
  sem :any= [];
  courses :any= [];


  studentResult:any;
  studentList:any;

  labResults:any;
  lablist:any;
  
  lab1:string="";
  lab2:string="";
  lab3:string="";
  lab4:string="";

  showSem:number=0;
  showdiv:string="A";
showdate:any;

datatemp:any;

  constructor(private labservice:LabService,
    private toast:ToastrService,
    private route:Router) {
    this.showdate=this.labservice.displayDate();
    this.datatemp=[];
  }
    
  ngOnInit(): void {
    // this.getLabList();
    
  }

   getStudentList(e:any)
   {
  
    this.showSem=e.Sem;
    console.log(this.showSem);
        this.showdiv=e.div;
      console.log(this.showdiv);
      this.showdiv.toLowerCase();

    this.labservice.getmarks().subscribe((data:any)=>
    {
      this.studentResult =data;
      this.studentList = this.studentResult.results;
      console.log(this.studentList);
      this.toast.success("student list fetched successfully");
    },
    (err:any)=>
{
  this.toast.error("server error data not found",err);
  if(err instanceof HttpErrorResponse)
  {
    if(err.status===401)
    {
      this.route.navigate(['/loginMain'])
    }
  }
})
    this.labservice.getattendance().subscribe((data:any)=>
    {
      this.labResults=data;
         console.log(this.labResults);
         this.lablist=this.labResults.results;
        console.log(this.lablist);
        this.toast.success("student list fetched successfully");
    },
    (err:any)=>
{
  this.toast.error("server error data not found",err);
  if(err instanceof HttpErrorResponse)
  {
    if(err.status===401)
    {
      this.route.navigate(['/loginMain'])
    }
  }
})
   
   } 
  


   
formvalue(E:any)
{
  let sem=E.target.value;

  if(sem==8)
  {
    console.log(sem);
    this.lab1="";
    this.lab2="";
    this.lab3="";
  

  }else
  if(sem==7)
  {
    console.log(sem);
    this.lab1="20ECSW401";
    this.lab2="";
    this.lab3="";
  }
  else if(sem==6)
  {
    console.log(sem);
    this.lab1="15ECSW302";
    this.lab2="20ECSP305";
    this.lab3="";

  }else if(sem==5)
    {
      console.log(sem);
      this.lab1="15ECSW301";
      this.lab2="19ECSP302";
      this.lab3="21ECSP304";

        }else if(sem==4){
          console.log(sem);
          this.lab1="20ECSP203";
          this.lab2="";
          this.lab3="";
          
            
        }else if(sem==3)
      {
        console.log(sem);
        this.lab1="15ECSP204";
        this.lab2="19ECSP201";
        this.lab3="";
        
      }
}
     
   
}

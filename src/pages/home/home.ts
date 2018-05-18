import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { DragulaService } from 'ng2-dragula/components/dragula.provider';
import firebase from 'firebase'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public items : any = [
    {
       name: 'Gorev 1',
       desc: 'Gorev 1i yap',
       color: 'red'
    },
    {
       name: 'Gorev 2',
       desc: 'Gorev 2i yap',
       color: 'green'
    },
    {
       name: 'Gorev 3',
       desc: 'Gorev 3u yap',
       color: 'yellow'
    },
 ];
 public garbage : any = [
  
];

    public items2 : any = [
      {
         name: 'Gorev 4',
         desc: 'Gorev 4u yap',
         color: 'green'
      },
      {
         name: 'Gorev 5',
         desc: 'Gorev 5i yap',
         color: 'gray'
      },
   ];
      public items3 : any = [
        {
           name: 'Gorev 6',
           desc: 'Gorev 6i yap',
           color: 'red'
        },
        {
           name: 'Gorev 7',
           desc: 'Gorev 7i yap',
           color: 'red'
        },
    ];

        public colors : any = [
          {
            name: 'red',
            code : '#ff0000' ,
            desc: 'urgent and important'
          },
          {
            name: 'yellow',
            code : '#ffff00' ,
            desc: 'important but not urgent'
          },
          {
            name: 'green',
            code : '#00ff00' ,
            desc: 'Urgent but not important'
          },
          {
            name: 'gray',
            code : '#aaaaaa' ,
            desc: 'not urgent nor important'
          },
        ]
        public eklenen:any = 
          {
          col:'',  
          name:'',
           desc:'',
           color:'',
          }
          public pushed:any = {
            name:'',
            desc:'',
            color:'',
          }
        

          public kolon: Array<{ firstCol: string}> = [];
          public maxQuantity: number = 10;
          public maxrows;
          public maxcols;
          public numOfnotes;
          public numOfnotes2;
          public numOfnotes3;
          public iteration;

  constructor(private navController: NavController, public alertCtrl: AlertController, public _DRAG: DragulaService) {



    var yeni;
    var yeni2;
    var yeni3;

    if(localStorage.getItem("items")){
      yeni=localStorage.getItem("items")
      yeni=JSON.parse(yeni);
      this.items=yeni;
    }
    if(localStorage.getItem("items2")){
      yeni2=localStorage.getItem("items2")
      yeni2=JSON.parse(yeni2);
      this.items2=yeni2;
    }
    if(localStorage.getItem("items3")){
      yeni3=localStorage.getItem("items3")
      yeni3=JSON.parse(yeni3);
      this.items3=yeni3;
    }




    console.log(localStorage.getItem("index"+0))
    if(localStorage.getItem("iter")){
      var its =  parseInt(localStorage.getItem('iter'))
     //console.log(its)
      var sutun;  
      for(var i = 0 ; i<=its;i++){
        sutun=localStorage.getItem("col"+i)
        console.log(sutun);
     if(sutun === "1"){  
     // console.log("index"+i)
     // console.log(localStorage.getItem("index"+i))
    this.items[localStorage.getItem("index"+i)].name=localStorage.getItem("title"+i);
     this.items[localStorage.getItem("index"+i)].desc=localStorage.getItem("desc"+i);}
     else if( sutun === "2"){ 
    this.items2[localStorage.getItem("index"+i)].name=localStorage.getItem("title"+i);
     this.items2[localStorage.getItem("index"+i)].desc=localStorage.getItem("desc"+i);}
      else {
    this.items3[localStorage.getItem("index"+i)].name=localStorage.getItem("title"+i);
    this.items3[localStorage.getItem("index"+i)].desc=localStorage.getItem("desc"+i);}
    }
    }

      var temp=document.cookie;
      //console.log(temp)
      if(temp){
        var res = temp.split("*");
        for(var i=0;i<res.length;i++){
        if(res[i].length>0){
          var a = JSON.parse(res[i])
          if(a.col==="1"){
          this.items.push(JSON.parse(res[i]));
          }else if (a.col ==="2"){
            this.items2.push(JSON.parse(res[i]))
          }else{
            this.items3.push(JSON.parse(res[i]))
          }
        }
       
      }
      // console.log(this.items);
      
      }
      var temp1;
      var temp2;
      var temp3;
      _DRAG.drop.subscribe((value) => {

        temp1=JSON.stringify(this.items)
        temp2=JSON.stringify(this.items2)
        temp3=JSON.stringify(this.items3)
        localStorage.setItem("items",temp1)
        localStorage.setItem("items2",temp2)
        localStorage.setItem("items3",temp3)

        this.updatenumofnotes();
      });
     // console.log(Object.keys(this.items).length)

   
      //this.maxrows = Array(a).fill(0)
     // this.maxcols= Array(3).fill(0)

      this.updatenumofnotes();
    
  }
  ionViewDidLoad() {
    //console.log(this.items)
  }

  addnote(column:number,color:string,desc:string,name:string)
  {
    let self=this
    self.eklenen.col=column;
    self.eklenen.name=name;
    self.eklenen.color=color;
    self.eklenen.desc=desc;
    
    document.cookie=JSON.stringify(self.eklenen)+"*"+document.cookie;
    this.navController.push(HomePage);
  }

  shownote(name:string,desc:string,color:string,index)
  {
    let self = this
    console.log(index)
    let alert = this.alertCtrl.create({
      title: name,
      subTitle:desc,
      inputs: [
        {
          name: 'title',
          placeholder: name
        },
        {
          name: 'desc',
          placeholder: desc
        },
      ],
      buttons: [ {
        text: 'Kapat',
        handler: () => {
          console.log('Kapat clicked');
        }
      },
      {
        text: 'Sil',
        handler: () => {
            this.items2.splice(index, 1);
        }
      },
      {
        text: 'Kaydet',
        handler:data  => {
          self.degistirme();
          localStorage.setItem("desc"+self.iteration, data.desc);
          localStorage.setItem("title"+self.iteration, data.title);
          localStorage.setItem("index"+self.iteration,index);
          localStorage.setItem("col"+self.iteration,"1"); 
          localStorage.setItem("color"+self.iteration,color)
       
         
        
          this.navController.push(HomePage)
         
        }
      } 
    ]
    });
    alert.present();
  }




  shownote2(name:string,desc:string,color:string,index)
  { let self = this
    console.log(index)
    let alert = this.alertCtrl.create({
      title: name,
      subTitle:desc,
      inputs: [
        {
          name: 'title',
          placeholder: name
        },
        {
          name: 'desc',
          placeholder: desc
        },
      ],
      buttons: [ {
        text: 'Kapat',
        handler: () => {
          console.log('Kapat clicked');
        }
      },
      {
        text: 'Sil',
        handler: () => {
            this.items2.splice(index, 1);
        }
      },
      {
        text: 'Kaydet',
        handler:data  => {
          self.degistirme();
          localStorage.setItem("desc"+self.iteration, data.desc);
          localStorage.setItem("title"+self.iteration, data.title);
          localStorage.setItem("index"+self.iteration,index);
          localStorage.setItem("col"+self.iteration,"2"); 
          localStorage.setItem("color"+self.iteration,color)
        
          this.navController.push(HomePage)
         
        }
      } 
    ]
    });
    alert.present();
  }





  shownote3(name:string,desc:string,color:string,index)
  {    let self = this
    console.log(index)
    let alert = this.alertCtrl.create({
      title: name,
      subTitle:desc,
      inputs: [
        {
          name: 'title',
          placeholder: name
        },
        {
          name: 'desc',
          placeholder: desc
        },
      ],
      buttons: [ {
        text: 'Kapat',
        handler: () => {
          console.log('Kapat clicked');
        }
      },
      {
        text: 'Sil',
        handler: () => {
            this.items2.splice(index, 1);
        }
      },
      {
        text: 'Kaydet',
        handler:data  => {
          self.degistirme();
          localStorage.setItem("desc"+self.iteration, data.desc);
          localStorage.setItem("title"+self.iteration, data.title);
          localStorage.setItem("index"+self.iteration,index);
          localStorage.setItem("col"+self.iteration,"3"); 
          localStorage.setItem("color"+self.iteration,color)
          
          
          this.navController.push(HomePage)
         
        }
      } 
    ]
    });
    alert.present();
  }















  degistirme(){
    this.iteration = localStorage.getItem("iter")
    if(this.iteration){
      this.iteration =  parseInt(this.iteration) + 1
      localStorage.setItem("iter",this.iteration)
    }else{
      this.iteration=0;
      localStorage.setItem("iter","0")
    }
   

  }
  updatenumofnotes(){
    this.numOfnotes = Object.keys(this.items).length

    this.numOfnotes2 = Object.keys(this.items2).length

    this.numOfnotes3 = Object.keys(this.items3).length


  }

}
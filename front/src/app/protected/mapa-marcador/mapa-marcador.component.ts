import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MarcadorColor } from 'src/app/auth/interfaces/interfaces';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-mapa-marcador',
  templateUrl: './mapa-marcador.component.html',
  styleUrls: ['./mapa-marcador.component.css']
})
export class MapaMarcadorComponent implements AfterViewInit {

  zoomMap:number=15;
  centro: [number,number]=[-73.1069380742555,7.099438251453237];
  @ViewChild('mapa') divMapa?: ElementRef;
  mapa!: mapboxgl.Map;

  constructor(private authService : AuthService) { }

  marcadores: MarcadorColor[]=[];

  get Marcadores(){
    return this.authService.marcadorColor;
  }
  ngAfterViewInit(): void {
    this.mapa=new mapboxgl.Map({
      container:this.divMapa?.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.centro,
      zoom:this.zoomMap
    });

    this.leerLocalStorage();
    // const makerHtml : HTMLElement = document.createElement('div');
    // makerHtml.innerHTML= 'Hola';
    // new mapboxgl.Marker({
    //   element:makerHtml
    // })



  }

  agregarMarcador(){
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

    const nuevoMarker = new mapboxgl.Marker({
      draggable:true,
      color
    })
      .setLngLat(this.centro)
      .addTo(this.mapa);

    this.marcadores.push({
      color,
      marker: nuevoMarker
    });

    this.guardarMarcadorLocalStorage();
    nuevoMarker.on('dragend' , () =>{
      console.log('drag')
      this.guardarMarcadorLocalStorage();
    } );
    // nuevoMarker.on('dragend',()=>{
    //   console.log('drag')
    //   this.guardarMarcadorLocalStorage();
    // });
  }

  IrMarcador(marker:mapboxgl.Marker){
    this.mapa.flyTo({
      center: marker.getLngLat()
    })


  }


  guardarMarcadorLocalStorage(){
    const LngLatARR : MarcadorColor[]=[];
    this.marcadores.forEach( m => {
      const color = m.color;
      const {lng,lat}= m.marker!.getLngLat();
      LngLatARR.push({
        color,
        centro:[lng,lat]
      });
    })
    localStorage.setItem('marcadores',JSON.stringify(LngLatARR));
  }


  leerLocalStorage(){
    if (!localStorage.getItem('marcadores') ){
      return;
    }

    const lnglatArr: MarcadorColor[]= JSON.parse(localStorage.getItem('marcadores')!);

    lnglatArr.forEach(m =>{

      const newMarker = new mapboxgl.Marker({
        color:m.color,
        draggable:true
      })
        .setLngLat(m.centro!)
        .addTo(this.mapa);

      this.marcadores.push({
        marker:newMarker,
        color:m.color
      });

      newMarker.on('dragend' , () =>{
        console.log('drag')
        this.guardarMarcadorLocalStorage();
      } );
    })

  }

  borrandoMarcador(i:number){
    console.log('borrando marker: ',i+1);
    this.marcadores[i].marker?.remove();
    this.marcadores.splice(i,1);
    this.guardarMarcadorLocalStorage();

  }
}

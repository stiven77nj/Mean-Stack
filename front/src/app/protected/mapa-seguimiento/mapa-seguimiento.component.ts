import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mapa-seguimiento',
  templateUrl: './mapa-seguimiento.component.html',
  styleUrls: ['./mapa-seguimiento.component.css']
})
export class MapaSeguimientoComponent implements AfterViewInit , OnDestroy {
  zoomMap:number=12;
  centro: [number,number]=[-73.1069380742555,7.099438251453237];

  @ViewChild('mapa') divMapa?: ElementRef;
  mapa!: mapboxgl.Map;

  constructor() { }
  //se debe limpiar todos los listeners usados (this.mapa.on())
  ngOnDestroy(): void {
    this.mapa.off('zoom',()=>{});
    this.mapa.off('zoomend',()=>{});
    this.mapa.off('move',()=>{});
  }

  ngAfterViewInit(): void {
    this.mapa=new mapboxgl.Map({
      container:this.divMapa?.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.centro,
      zoom:this.zoomMap
    });
    const maker = new mapboxgl.Marker()
      .setLngLat(this.centro)
      .addTo(this.mapa)

    //METODO GETZOOM PARA OBTENER VALOR ACTUAL DEL ZOOM DEL MAPA
    this.mapa.on('zoom',(en) => {
      this.zoomMap =this.mapa.getZoom();
    });

    this.mapa.on('zoomend',(en) => {
      //CONDICION PARA QUE EL ZOOM NO SE ALEJE A MAS DE 18
      if (this.mapa.getZoom() > 18){
        this.mapa.zoomTo(18);
      }
      //CONDICION PARA QUE EL ZOOM NO SE ACERQUE A MAS DE 5
      if (this.mapa.getZoom()< 5){
        this.mapa.zoomTo(5);
      }

    });

    //OBTENER LAS COORDENADAS
    this.mapa.on('move',(event) =>{
      const target = event.target;
      const {lng, lat}= target.getCenter();
      this.centro = [lng,lat];
    })
  }
  IrMarcador(marker:mapboxgl.Marker){
    this.mapa.flyTo({
      center: marker.getLngLat()
    })


  }

  //MOVIMIENTO ZOOM ACERCARSE
  zoomIn(){
    this.mapa.zoomIn();
  }
  //MOVIMIENTO ZOOM ALEJARSE
  zoomOut(){
    this.mapa.zoomOut();
  }
  //MOVIMIENTO DEL ZOOM CON EL RANGE
  zoomCambio(valor:string){
    this.mapa.zoomTo(Number(valor));
  }
}



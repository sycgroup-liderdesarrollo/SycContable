import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProviderInterface } from '../../interfaces/provider-interface';
import { ProvidersService } from '../../services/providers.service';

@Component({
  selector: 'app-details-provider',
  templateUrl: './details-provider.component.html',
  styleUrls: ['./details-provider.component.scss']
})
export class DetailsProviderComponent implements OnInit, OnChanges {

  @Input() provider_id: number;

  provider_data: ProviderInterface;
  isCovenantEmpty: boolean = false;
  isContactEmpty: boolean = false;

  constructor(
    private serviceProvider: ProvidersService
  ) { }

  ngOnInit(): void {
    this.getProvider();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.provider_id.currentValue){
      this.getProvider();
    }
  }
  getProvider(){
    this.serviceProvider.getProvider(this.provider_id).subscribe(resp => {
      this.provider_data = resp.data
      console.log(this.provider_data);
      this.provider_data.covenants.length > 0 ? this.isCovenantEmpty = false : this.isCovenantEmpty = true;
      this.provider_data.contact.length > 0 ? this.isContactEmpty = false : this.isContactEmpty = true;

    })
  }
}

import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ProviderInterface } from '../../interfaces/provider-interface';
import { ProvidersService } from '../../services/providers.service';

@Component({
  selector: 'app-info-provider',
  templateUrl: './info-provider.component.html',
  styleUrls: ['./info-provider.component.scss']
})
export class InfoProviderComponent implements OnInit {

  length = 10;
  pageSize = 10;
  pageNumber = 1;
  pageSizeOptions: number[] = [5, 10];

  providers: ProviderInterface[];
  isProviderEmpty: boolean = false;
  provider_id: number;
  isSelected: boolean = false;

  constructor(
    private serviceProvider: ProvidersService
  ) { }

  ngOnInit(): void {
    this.getProviders();
  }


  getProviders(filterValue?: string, pageSize?: number, pageNumber?: number){
    this.serviceProvider.getProviders(filterValue, pageSize, pageNumber).subscribe(resp => {
      this.providers = resp.data
      this.length = resp.meta?.total ?? 10;
      this.providers.length > 0 ? this.isProviderEmpty = false : this.isProviderEmpty = true;
    })
  }
  providerFilter(e:any){
    this.getProviders(e.target.value);
  }
  handlePage(event: PageEvent){
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex + 1;
    this.getProviders('', this.pageSize, this.pageNumber)
  }
  providerSelected(provider_id: number){
    this.provider_id = provider_id;
    this.isSelected = true;
  }
}

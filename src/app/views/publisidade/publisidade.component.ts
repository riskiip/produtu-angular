import { Component } from '@angular/core';

import { error } from 'console';
import { ProductService } from '../home/product.service';

@Component({
  selector: 'app-publisidade',
  templateUrl: './publisidade.component.html',
  styleUrls: ['./publisidade.component.scss'] 
})
export class PublisidadeComponent {
  formData: any = {
    titlu: '',
    telemovel: '',
    imagem: null,
    deskrisaun: '',
    kategoria: '',
    munisipiu: '',
    price: null,
    postoAdministrativu: '',
    subkategoria: ''
  };

  categories: any[] = [
    { text: 'Kategoria 1', value: 'kategori1' },
    { text: 'Kategoria 2', value: 'kategori2' }
  ];
  subCategories: any[] = [];
  locations: any[] = [
    { text: 'Aileu', value: 'location1' },
    { text: 'Ainaru', value: 'location2' },
    { text: 'Baucau', value: 'location3' }
  ];
  subLocations: any[] = [];
  postoadministrativu: any[] = [];

  showSubkategori = false;
  showPostoadministrativu = false;

  constructor(private productService: ProductService) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.formData.imagem = file;
  }

  onKategoriChange(event: any) {
    const selectedKategoria = event.target.value;
    
    if (selectedKategoria === 'kategori1') {
      this.subCategories = [
        { text: 'Subkategoria 1-1', value: 'subkategoria1-1' },
        { text: 'Subkategoria 1-2', value: 'subkategoria1-2' }
      ];
    } else if (selectedKategoria === 'kategori2') {
      this.subCategories = [{ text: 'Subkategoria 2-1', value: 'subkategoria2-1' }];
    }
    this.showSubkategori = this.subCategories.length > 0;
  }

  onLocationChange(event: any) {
    const selectedLocation = event.target.value;
    
    if (selectedLocation === 'location1') {
      this.postoadministrativu = [
        { text: 'Postoadministrativu 1-1', value: 'posto1-1' },
        { text: 'Postoadministrativu 1-2', value: 'posto1-2' }
      ];
    } else if (selectedLocation === 'location2') {
      this.postoadministrativu = [{ text: 'Postoadministrativu 2-1', value: 'posto2-1' }];
    }
    this.showPostoadministrativu = this.postoadministrativu.length > 0;
  }

  postDataToAPI() {
    // Convert the values to integer and check for valid data
    const deskrisaun = this.formData.deskrisaun ? this.formData.deskrisaun.trim() : '';
    const kategoria = this.formData.kategoria ? parseInt(this.formData.kategoria, 10) : NaN;
    const munisipiu = this.formData.munisipiu ? parseInt(this.formData.munisipiu, 10) : NaN;
  
    // Form validation checks
    if (!deskrisaun || deskrisaun.length === 0) {
      alert('Deskrisaun field cannot be empty.');
      return;
    }
  
    if (isNaN(kategoria)) {
      alert('Kategoria should be a valid integer ID.');
      return;
    }
  
    if (isNaN(munisipiu)) {
      alert('Munisipiu should be a valid integer ID.');
      return;
    }
  
    const formData: FormData = new FormData();
    formData.append('titlu', this.formData.titlu);
    formData.append('telemovel', this.formData.telemovel);
  
    // Make sure the image is a File object
    if (this.formData.imagem) {
        formData.append('imagem', this.formData.imagem);
    }
  
    formData.append('deskrisaun', deskrisaun); 
    formData.append('kategoria', String(kategoria)); 
    formData.append('munisipiu', String(munisipiu)); 
    formData.append('postoAdministrativu', this.formData.postoAdministrativu || '');
    formData.append('subkategoria', this.formData.subkategoria || '');
  
    // Ensure price is a string
    const price = this.formData.price ? String(this.formData.price) : '0';
    formData.append('price', price);
  
    console.log('Form Data to be Submitted:', formData);
  
    this.productService.postData(formData).subscribe({
      next: response => {
        console.log('Response from API:', response);
      },
      error: error => {
        console.error('Error posting data to API:', error);
        if (error.error) {
          console.error('Server returned error:', error.error);
        }
        alert('An error occurred while posting data. Please try again later.');
      }
    });
  } 
}  
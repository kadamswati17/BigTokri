import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../cart.service'; // Adjust the path if necessary
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss'],
})
export class FoodComponent implements OnInit {
  activeSection: string = 'vegetables'; // Default section
  vegetableCategories: any[] = [];
  fruitCategories: any[] = [];
  exoticVegetableCategories: any[] = [];
  apiBaseUrl = 'https://octopus-app-yhqe6.ondigitalocean.app/categories'; // Base API URL

  constructor(
    private http: HttpClient,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.activeSection = params['section'] || 'vegetables';
      this.fetchCategoryData(this.activeSection);
    });
  }

  fetchCategoryData(section: string): void {
    let categoryId = '';

    if (section === 'vegetables') {
      categoryId = '123e4567-e89b-12d3-a456-426614174001'; // Vegetables
    } else if (section === 'fruits') {
      categoryId = '123e4567-e89b-12d3-a456-426614174008'; // Fruits
    } else if (section === 'exoticVegetables') {
      categoryId = '123e4567-e89b-12d3-a456-426614174011'; // Exotic Vegetables
    }

    if (categoryId) {
      const apiUrl = `${this.apiBaseUrl}/${categoryId}/products`;

      this.http.get<any>(apiUrl).subscribe(
        (response) => {
          if (response.statusCode === 200 && response.data) {
            const products = response.data.map((product: any) => ({
              id: product.id,
              name: product.name,
              price: parseFloat(product.b2c_base_price),
              oldPrice: parseFloat(product.normal_discount),
              discount: `${product.normal_discount}%`,
              imageUrl: product.images?.[0]?.url,
              description: product.description,
              b2c_base_unit: product.b2c_base_unit,
              b2c_denominations: product.b2c_denominations,
              b2c_denomination_type: product.b2c_denomination_type,
            }));

            if (section === 'vegetables') {
              this.vegetableCategories = products;
            } else if (section === 'fruits') {
              this.fruitCategories = products;
            } else if (section === 'exoticVegetables') {
              this.exoticVegetableCategories = products;
            }
          }
        },
        (error) => {
          console.error(`Error fetching ${section} data:`, error);
        }
      );
    }
  }

  toggleSection(section: string): void {
    this.activeSection = section;
    this.fetchCategoryData(section);
  }

  addToCart(item: any): void {
    this.cartService.addToCart(item);
    console.log(`${item.name} added to cart!`);
  }
}

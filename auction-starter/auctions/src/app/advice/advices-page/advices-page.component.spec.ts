import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvicesPageComponent } from './advices-page.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('AdvicesPageComponent', () => {
  let component: AdvicesPageComponent;
  let fixture: ComponentFixture<AdvicesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvicesPageComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvicesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

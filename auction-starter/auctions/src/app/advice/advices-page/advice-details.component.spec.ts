import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdviceDetailsComponent } from './advice-details.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('AdviceDetailsComponent', () => {
  let component: AdviceDetailsComponent;
  let fixture: ComponentFixture<AdviceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdviceDetailsComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdviceDetailsComponent);
    fixture.componentRef.setInput('adviceId', 'test-uid');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

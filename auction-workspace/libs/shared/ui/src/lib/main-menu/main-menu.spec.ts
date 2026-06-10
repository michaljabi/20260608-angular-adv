import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainMenu } from './main-menu';
import { provideRouter } from '@angular/router';

describe('MainMenu', () => {
  let component: MainMenu;
  let fixture: ComponentFixture<MainMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainMenu],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(MainMenu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

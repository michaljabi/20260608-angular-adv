import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PicsumPhotoChooser } from './picsum-photo-chooser';

describe('PicsumPhotoChooser', () => {
  let component: PicsumPhotoChooser;
  let fixture: ComponentFixture<PicsumPhotoChooser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PicsumPhotoChooser],
    }).compileComponents();

    fixture = TestBed.createComponent(PicsumPhotoChooser);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

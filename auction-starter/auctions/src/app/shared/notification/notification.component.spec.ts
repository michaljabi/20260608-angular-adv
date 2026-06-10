import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NotificationComponent } from './notification.component';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotificationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('message', 'test');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render message', () => {
    fixture.componentRef.setInput('message', 'Test message');
    fixture.detectChanges();
    const msg = fixture.debugElement.query(By.css('.message'));
    expect(msg.nativeElement.textContent).toContain('Test message');
  });

  it('should apply type class', () => {
    fixture.componentRef.setInput('type', 'error');
    fixture.detectChanges();
    const div = fixture.debugElement.query(By.css('.notification'));
    expect(div.nativeElement.classList).toContain('error');
  });

  it('should show dismiss button by default', () => {
    const btn = fixture.debugElement.query(By.css('.dismiss'));
    expect(btn).toBeTruthy();
  });

  it('should hide dismiss button when dismissible is false', () => {
    fixture.componentRef.setInput('dismissible', false);
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('.dismiss'));
    expect(btn).toBeFalsy();
  });

  it('should emit dismiss on button click', () => {
    let emitted = false;
    component.dismiss.subscribe(() => (emitted = true));
    const btn = fixture.debugElement.query(By.css('.dismiss'));
    btn.nativeElement.click();
    expect(emitted).toBe(true);
  });
});

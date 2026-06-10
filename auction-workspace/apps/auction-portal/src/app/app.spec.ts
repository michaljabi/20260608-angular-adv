import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { Header, MainMenu } from '@auction-workspace/shared/ui';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, Header, MainMenu],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('renders the header subtitle', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h4')?.textContent).toContain(
      'kup teraz',
    );
  });
});

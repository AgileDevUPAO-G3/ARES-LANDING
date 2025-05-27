import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoletaPdfComponent } from './boleta-pdf.component';

describe('BoletaPdfComponent', () => {
  let component: BoletaPdfComponent;
  let fixture: ComponentFixture<BoletaPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoletaPdfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoletaPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

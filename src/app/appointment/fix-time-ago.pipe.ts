
import { Pipe, PipeTransform } from '@angular/core';

/**
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | medFixTimeAgoToSince
 * Example:
 *   {{ vor 10 Minuten |  medFixTimeAgoToSince}}
 *   formats to: seit 10 Minuten
 *
 *   {{ 10 minutes ago |  medFixTimeAgoToSince}}
 *   formats to: since 10 minutes
 */
@Pipe({name: 'medFixTimeAgoToSince'})
export class FixTimeAgoToSincePipe implements PipeTransform {

  private locale: string = localStorage.getItem('locale');

  public transform(value: string): string {
    if (this.locale.startsWith('de')) {
      return value.replace('vor', 'seit');
    } else if (this.locale.startsWith('en')) {
      return 'since ' + value.replace('ago', '');
    }
  }

}

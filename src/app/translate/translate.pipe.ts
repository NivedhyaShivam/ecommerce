// app/translate/translate.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from './index'
@Pipe({
    name: 'translate',
    pure: false // impure pipe, update value when we change language
})

export class TranslatePipe implements PipeTransform {

	constructor(private _translate: TranslateService) { }

	transform(value: string): any {
		console.log('value', value)
		if (!value) return;
		
		return this._translate.instant(value);
	}
}
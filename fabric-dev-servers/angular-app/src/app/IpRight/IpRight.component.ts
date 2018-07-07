/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IpRightService } from './IpRight.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-ipright',
  templateUrl: './IpRight.component.html',
  styleUrls: ['./IpRight.component.css'],
  providers: [IpRightService]
})
export class IpRightComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  rightID = new FormControl('', Validators.required);
  company = new FormControl('', Validators.required);
  property = new FormControl('', Validators.required);
  article = new FormControl('', Validators.required);
  territory = new FormControl('', Validators.required);
  owner = new FormControl('', Validators.required);

  constructor(public serviceIpRight: IpRightService, fb: FormBuilder) {
    this.myForm = fb.group({
      rightID: this.rightID,
      company: this.company,
      property: this.property,
      article: this.article,
      territory: this.territory,
      owner: this.owner
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceIpRight.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.example.biznet.IpRight',
      'rightID': this.rightID.value,
      'company': this.company.value,
      'property': this.property.value,
      'article': this.article.value,
      'territory': this.territory.value,
      'owner': this.owner.value
    };

    this.myForm.setValue({
      'rightID': null,
      'company': null,
      'property': null,
      'article': null,
      'territory': null,
      'owner': null
    });

    return this.serviceIpRight.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'rightID': null,
        'company': null,
        'property': null,
        'article': null,
        'territory': null,
        'owner': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.example.biznet.IpRight',
      'company': this.company.value,
      'property': this.property.value,
      'article': this.article.value,
      'territory': this.territory.value,
      'owner': this.owner.value
    };

    return this.serviceIpRight.updateAsset(form.get('rightID').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceIpRight.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceIpRight.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'rightID': null,
        'company': null,
        'property': null,
        'article': null,
        'territory': null,
        'owner': null
      };

      if (result.rightID) {
        formObject.rightID = result.rightID;
      } else {
        formObject.rightID = null;
      }

      if (result.company) {
        formObject.company = result.company;
      } else {
        formObject.company = null;
      }

      if (result.property) {
        formObject.property = result.property;
      } else {
        formObject.property = null;
      }

      if (result.article) {
        formObject.article = result.article;
      } else {
        formObject.article = null;
      }

      if (result.territory) {
        formObject.territory = result.territory;
      } else {
        formObject.territory = null;
      }

      if (result.owner) {
        formObject.owner = result.owner;
      } else {
        formObject.owner = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'rightID': null,
      'company': null,
      'property': null,
      'article': null,
      'territory': null,
      'owner': null
      });
  }

}

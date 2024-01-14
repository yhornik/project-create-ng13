import { Component, OnInit } from '@angular/core';
import { filter, sortBy, forEach, map } from 'lodash';
import { randomUser } from './utils';
import { User } from './user';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss']
})
export class MonitorComponent implements OnInit {
  userArray: User[] = Array.from({ length: 10000 }, randomUser);
  elapse!: number;
  constructor() { }

  ngOnInit(): void {
    // Create an array of user objects with random data
    
    console.log('origin', this.userArray);

    console.log('===== MAP =====================')
    const userArrayForLodashMap = [...this.userArray];
    const userArrayForNativeMap = [...this.userArray];
    // lodash map
    console.time('lodash-map');
    const arrayMappedByLodash = map(userArrayForLodashMap, (item) => 
      { return {...item, description: 'mapped by lodash'}} 
    );
    console.timeEnd('lodash-map');
    
    // native map
    console.time('native-map');
    const arrayMappedByNative = userArrayForNativeMap.map(item => {
      return { ...item, description: 'mapped by native'}
    })
    console.timeEnd('native-map')
    
    console.log('---------------------------------')
    console.log('arrayMappedByLodash', arrayMappedByLodash);
    console.log('arrayMappedByNative', arrayMappedByNative);

    console.log('===== FILTER =====================')
    // lodash filter
    console.time('lodash-filter');
    const filteredUser = filter(this.userArray, ({ age }) => age > 30); 
    console.timeEnd('lodash-filter'); 

    // native filter
    console.time('native-filter');
    const filteredUserNative = this.userArray.filter(({ age }) => age > 30 ); 
    console.timeEnd('native-filter');
    console.log('---------------------------------')
    console.log('filteredUser using lodash', filteredUser);
    console.log('filteredUser using native', filteredUserNative);

    console.log('===== SORT =======================')
    const userArrayLodash = [...this.userArray];
    const userArrayNative = [...this.userArray];
    // lodash sort
    console.time('lodash-sort');
    const sortedLodashArray = sortBy(userArrayLodash, ['age']);
    console.timeEnd('lodash-sort');
    
    // native sort
    console.time('native-sort');
    userArrayNative.sort((a: User, b: User) => a.age - b.age);
    console.timeEnd('native-sort');
    console.log('---------------------------------')
    console.log('sorted by lodash', sortedLodashArray)
    console.log('sorted by native', userArrayNative);

    console.log('===== FOREACH =====================')
    // lodash forEach
    console.time('lodash-forEach');
    forEach(this.userArray, (item) => {
      item.description = 'checkin';
    });
    console.timeEnd('lodash-forEach');

    // native forEach
    console.time('native-forEach');
    this.userArray.forEach(item => item.description = 'checkou')
    console.timeEnd('native-forEach');

  
  }

}

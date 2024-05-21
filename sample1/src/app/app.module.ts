// import { NgModule } from '@angular/core';
// import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
// import { CoursesComponent } from './courses/courses.component';

// import { HttpClientModule, provideHttpClient, withFetch} from '@angular/common/http';
// import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';

// import { FormsModule } from '@angular/forms'; 
// import { InMemoryCache } from '@apollo/client/core';
// import { HttpLink } from 'apollo-angular/http';
// import { GraphQLModule} from './graphql.module';



// @NgModule({
//   declarations: [
//     AppComponent,
//     CoursesComponent
//   ],
//   imports: [
//     BrowserModule,
//     AppRoutingModule,
//     HttpClientModule,
//     ApolloModule,
//     GraphQLModule,
//     FormsModule
//   ],
//   providers: [
//     provideHttpClient(withFetch()),
//   ],
//   bootstrap: [AppComponent]
// })
// export class AppModule {}

//2nd
//
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule , provideHttpClient, withFetch} from '@angular/common/http';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoursesComponent } from './courses/courses.component';
import { GraphQLModule } from './graphql.module';
// import * as dotenv from 'dotenv';
// dotenv.config();
@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ApolloModule,
    GraphQLModule,
    FormsModule
  ],
  providers: [
    provideHttpClient(withFetch()),
    // {
    //   provide: APOLLO_OPTIONS,
    //   useFactory: provideApollo,
    //   deps: [HttpLink]
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

// export function provideApollo(httpLink: HttpLink) {
//   return {
//     cache: new InMemoryCache(),
//     link: httpLink.create({
//       uri: 'http://localhost:5000/graphql' // Adjust the URL to match your server endpoint
//     })
//   };
// }


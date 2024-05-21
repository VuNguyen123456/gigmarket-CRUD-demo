// import { NgModule } from '@angular/core';
// import { HttpClientModule } from '@angular/common/http';
// import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
// import { HttpLink } from 'apollo-angular/http';
// import { InMemoryCache } from '@apollo/client/core';
// import { ApolloClientOptions } from '@apollo/client/core/ApolloClient';

// @NgModule({
//     imports: [HttpClientModule, ApolloModule],
//     providers: [
//       {
//         provide: APOLLO_OPTIONS,
//         useFactory: (httpLink: HttpLink) => {
//           return {
//             link: httpLink.create({ uri: 'http://localhost:4000/graphql' }),
//             cache: new InMemoryCache(),
//           };
//         },
//         deps: [HttpLink]
//       }
//     ]
//   })
//   export class GraphQLModule {}

  //2nd try
import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          link: httpLink.create({ uri: 'http://localhost:5000/graphql' }), // Your GraphQL endpoint
          cache: new InMemoryCache(),
        };
      },
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
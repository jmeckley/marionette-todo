Chutzpah documentation can be found at
https://github.com/mmanela/chutzpah/wiki

Chutuzpah.json is referencing the unsecured javascript CDN files. 

This is due to a bug with PhantomJS. See the following links for details about this specific issue
* https://github.com/mmanela/chutzpah/issues/286
* https://github.com/airportyh/testem/issues/419

I would have put these comments directly in the .json file however the documentation says the .json adheres to strict JSON formatting and does not handle comments.
/*
 * w3stan - HTML slide panel
 * Copyright 2024 Adrien Ricciardi
 * See LICENSE for details
 */
(async function(window, document) {
  function to_percent(number) {
    return ( (number * 100).toString() + "%" );
  }

  function w3stan_error_not_in_frame(document) {
    document.body.innerHTML = "<p>not in frame!</p>";
    return null;
  }

  function w3stan_error_invalid_listing(document) {
    document.body.innerHTML = "<p>invalid listing!</p>";
    return null;
  }

  function w3stan_error_unspecified_listing(document) {
    document.body.innerHTML = "<p>unspecified listing!</p>";
    return null;
  }


  async function w3stan_build_valid_resources(path_list, origin) {

    return Promise.all(path_list.map(async function(path) {
      let url = origin + path;
      /* XXX: could check if valid image type */
      return url;
    }));

  }


  async function w3stan_read_listing(listing_url, origin) {
    /*
     * Only files from the same domain can be reached like this.
     * The listing is a JSON file of the following format:
     *
     * [
     *   "path1",
     *   "path2",
     *   ...
     * ]
     */
    let path_list = (async function() {

      try {
        var response = await fetch(listing_url, {
          method: "GET",
          headers: {
            'Accept': 'application/json'
          }
        });

        var file_list = await response.json();
        return await file_list;
      } catch (error) {
        console.log(error);
        return null;
      }

      return (await file_list);
    })();

    //return path_list;

    return w3stan_build_valid_resources(await path_list, origin);
  }


  async function w3stan_build_items(document, fragment, res_list) {
    let num_res = res_list.length;
    var items = [];

    /* durations in seconds */
    const FADE_DURATION = 2.7;
    const OPAQUE_DURATION = 5.0;

    let cycle_duration = (num_res * OPAQUE_DURATION);

    let root = document.querySelector(":root");

    /* build keyframes */
    let opaque_start = 0.0;
    let opaque_end = (OPAQUE_DURATION / cycle_duration);
    let fade_end = ( (OPAQUE_DURATION + FADE_DURATION) / cycle_duration );

    let anim_keyframes = [
      {
        offset: 0.0,
        visibility: "visible"
      },

      {
        offset: opaque_start,
        opacity: 1.0
      },

      {
        offset: opaque_end,
        opacity: 1.0
      },

      {
        offset: fade_end,
        opacity: 0.0,
        visibility: "hidden"
      },

      {
        offset: 1.0
      }
    ];


    for (var item_idx = 0; item_idx < num_res; ++item_idx) {
      let res_url = res_list[item_idx];
      var image = document.createElement("img");

      image.src = res_url;
      image.classList.add("w3stan-fading");

      let delay = (item_idx * OPAQUE_DURATION);

      let anim_options = {
        delay: (delay * 1000.0),
        direction: "normal",
        duration: (cycle_duration * 1000.0),
        easing: "linear",
        iterations: Infinity
      };

      image.animate(anim_keyframes, anim_options);

      items.push(image);
    }

    /* reverse order for correct stacked rendering */
    let flipped_items = items.reverse();
    for (var item of flipped_items) {
      fragment.append(item);
    }

    return fragment;
  }


  async function w3stan_refresh_listing(frame, origin, listing_url) {
    /*
     * Rebuilds all frame contents just to be sure; this should rarely
     * happen anyway.
     */

    var document = frame.contentDocument;
    document.body.innerHTML = "";

    if (listing_url === "") {
      return w3stan_error_unspecified_listing(document);
    }

    /*
     * Check what resources accessible to begin with.
     */
    let res_list = await w3stan_read_listing(listing_url, origin);
    if (res_list === null) {
      return w3stan_error_invalid_listing(document);
    }


    /*
     * Create stacked containers
     */
    document.body.append( await w3stan_build_items(document, document.createDocumentFragment(), res_list) );


    return null;
  }


  function w3stan_connect(window, document) {
    /*
     * Enable w3stan listing refresher for frame, if possible
     */

    var w3stan_frame = window.frameElement;
    const origin = window.location.origin;

    if (w3stan_frame === null) {
      return w3stan_error_not_in_frame(document);
    }


    var w3stan_listing_observer = new MutationObserver(function(mutations_list) {

      for (const mutation of mutations_list) {

        if (mutation.type === "attributes"
         && mutation.attributeName === "data-w3stan-listing") {
          var frame = mutation.target;

          w3stan_refresh_listing(frame, origin, frame.getAttribute("data-w3stan-listing"));
          break;
        }

      }

    });

    w3stan_listing_observer.observe(w3stan_frame, {
     attributeFilter: ['data-w3stan-listing'],
     attributes: true
    });

    
    return true;
  }



  async function main(window, document) {
    if ( w3stan_connect(window, document) ) {
      /* initial refresh */
      var frame = window.frameElement;
      let origin = window.location.origin;
      let listing = frame.getAttribute("data-w3stan-listing") || "";

      w3stan_refresh_listing(frame, origin, listing);
    }
  }

  main(window, document);

})(window, document);


/**
 * galleries.js — Kamilla Artist Portfolio
 *
 * Defines all gallery image data and builds the gallery DOM before
 * script.js runs its interaction layer.
 */

(function () {
  'use strict';

  /* ── Helpers ─────────────────────────────────────────────────────────────── */

  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /** Build a percent-encoded relative URL from an array of path segments. */
  function src() {
    return Array.prototype.slice.call(arguments).map(encodeURIComponent).join('/');
  }

  /** Build an artwork-card figure element for a gallery grid. */
  function artworkCard(imgSrc, altText) {
    return (
      '<figure class="artwork-card" tabindex="0" role="button" aria-label="' + esc(altText) + '">' +
      '<div class="artwork-card__img-wrap">' +
      '<img src="' + imgSrc + '" alt="" loading="lazy" ' +
      'onerror="this.parentElement.classList.add(\'img-placeholder\')" />' +
      '</div>' +
      '<figcaption class="artwork-card__caption"></figcaption>' +
      '</figure>'
    );
  }

  /* ── Fine Art image lists ─────────────────────────────────────────────────── */

  var DRAWING = [
    'IMG_2204.JPG','IMG_2207.JPG','IMG_2219.JPG','IMG_2225.JPG',
    'IMG_2925.JPG','IMG_2926.JPG','IMG_2927.JPG','IMG_2929.JPG','IMG_2930.JPG',
    'IMG_2956.JPG','IMG_2963.JPG','IMG_3094.JPG','IMG_3162.JPG',
    'IMG_3171.JPG','IMG_3172.JPG','IMG_3173.JPG','IMG_3174.JPG','IMG_3179.JPG',
    'IMG_3180.JPG','IMG_3184.JPG','IMG_3185.JPG','IMG_3186.JPG','IMG_3187.JPG',
    'IMG_3188.JPG','IMG_3193.JPG','IMG_3194.JPG','IMG_3195.JPG','IMG_3199.JPG',
    'IMG_3200.JPG','IMG_3202.JPG','IMG_3203.JPG','IMG_3204.JPG','IMG_3205.JPG',
    'IMG_3206.JPG','IMG_3208.JPG','IMG_3210.JPG','IMG_3211.JPG','IMG_3212.JPG',
    'IMG_3213.JPG','IMG_3215.JPG','IMG_3216.JPG','IMG_3217.JPG','IMG_3218.JPG',
    'IMG_3219.JPG','IMG_3220.JPG','IMG_3221.JPG','IMG_3222.JPG','IMG_3223.JPG',
    'IMG_3225.JPG','IMG_3226.JPG','IMG_3227.JPG','IMG_3228.JPG','IMG_3229.JPG',
    'IMG_3230.JPG','IMG_3235.JPG','IMG_3237.JPG','IMG_3238.JPG','IMG_3239.JPG',
    'IMG_3242.JPG','IMG_3243.JPG','IMG_3244.JPG','IMG_3245.JPG','IMG_3247.JPG',
    'IMG_3249.JPG','IMG_3250.JPG','IMG_3251.JPG','IMG_3252.JPG','IMG_3253.JPG',
    'IMG_3254.JPG','IMG_3255.JPG','IMG_3256.JPG','IMG_3258.JPG','IMG_3259.JPG',
    'IMG_3260.JPG','IMG_3261.JPG','IMG_3262.JPG','IMG_3263.JPG','IMG_3293.JPG',
    'IMG_3300.JPG','IMG_4221.JPG','IMG_4228.JPG','IMG_4230.JPG',
    'сканирование0076.jpg','сканирование0077.jpg','сканирование0078.jpg',
    'сканирование0079.jpg','сканирование0087.jpg','сканирование0088.jpg',
    'сканирование0089.jpg','сканирование0090.jpg','сканирование0091.jpg',
    'сканирование0093.jpg'
  ];

  var PAINTING = [
    'IMG_2235.JPG','IMG_2237.JPG','IMG_2238.JPG','IMG_2249.JPG','IMG_2253.JPG',
    'IMG_2256.JPG','IMG_2262.JPG','IMG_2283.JPG','IMG_3140.JPG','IMG_3152.JPG',
    'IMG_3155.JPG','IMG_3157.JPG','IMG_4164.JPG'
  ];

  var SCENIC_PAINTING = [
    'IMAG0324.jpg','IMAG0326.jpg','IMAG0328.jpg','case8.jpg','case9.jpg'
    // Image001.tif excluded — not supported by browsers
  ];

  /* ── Theatre production data ──────────────────────────────────────────────── */

  var PRODUCTIONS = [
    {
      id: 'woyzeck',
      title: 'Woyzeck',
      year: '2012',
      folder: '"Woyzeck", 2012',
      images: [
        '11-4489-WOYZECK-007.JPG','11-4489-WOYZECK-013.JPG','11-4489-WOYZECK-018.JPG',
        '11-4489-WOYZECK-023.JPG','11-4489-WOYZECK-032.JPG','11-4489-WOYZECK-035.JPG',
        '11-4489-WOYZECK-040.JPG','11-4489-WOYZECK-047.JPG','11-4489-WOYZECK-051.JPG',
        '11-4489-WOYZECK-053.JPG','11-4489-WOYZECK-062.JPG','11-4489-WOYZECK-102.JPG',
        '11-4489-WOYZECK-104.JPG','11-4489-WOYZECK-105.JPG','11-4489-WOYZECK-110.JPG',
        '11-4489-WOYZECK-113.JPG','11-4489-WOYZECK-123.JPG','11-4489-WOYZECK-131.JPG',
        '11-4489-WOYZECK-160.JPG','11-4489-WOYZECK-165.JPG','11-4489-WOYZECK-171.JPG',
        '11-4489-WOYZECK-192.JPG','11-4489-WOYZECK-205.JPG','11-4489-WOYZECK-206.JPG',
        '11-4489-WOYZECK-218.JPG','11-4489-WOYZECK-230.JPG','11-4489-WOYZECK-234.JPG',
        '11-4489-WOYZECK-235.JPG','11-4489-WOYZECK-239.JPG','11-4489-WOYZECK-244.JPG',
        '11-4489-WOYZECK-247.JPG','11-4489-WOYZECK-251.JPG','11-4489-WOYZECK-253.JPG',
        '11-4489-WOYZECK-259.JPG','11-4489-WOYZECK-283.JPG','11-4489-WOYZECK-287.JPG',
        '11-4489-WOYZECK-289.JPG','11-4489-WOYZECK-305.JPG','11-4489-WOYZECK-320.JPG',
        '11-4489-WOYZECK-328.JPG','11-4489-WOYZECK-337.JPG','11-4489-WOYZECK-359.JPG',
        '11-4489-WOYZECK-373.JPG','11-4489-WOYZECK-386.JPG','11-4489-WOYZECK-398.JPG',
        '11-4489-WOYZECK-425.JPG','11-4489-WOYZECK-427.JPG','11-4489-WOYZECK-462.JPG',
        '11-4489-WOYZECK-467.JPG','11-4489-WOYZECK-492.JPG','11-4489-WOYZECK-566.JPG',
        '11-4489-WOYZECK-595.JPG','11-4489-WOYZECK-607.JPG','11-4489-WOYZECK-677.JPG',
        '11-4489-WOYZECK-688.JPG','11-4489-WOYZECK-722.JPG','11-4489-WOYZECK-749.JPG',
        '11-4489-WOYZECK-752.JPG','11-4489-WOYZECK-754.JPG','11-4489-WOYZECK-771.JPG',
        '11-4489-WOYZECK-779.JPG','11-4489-WOYZECK-796.JPG','11-4489-WOYZECK-800.JPG',
        '11-4489-WOYZECK-821.JPG','11-4489-WOYZECK-852.JPG','11-4489-WOYZECK-895.JPG',
        '11-4489-WOYZECK-927.JPG'
      ]
    },
    {
      id: 'assassins',
      title: 'Assassins',
      year: '',
      folder: '"Assassins" Stephen Sondheim, John Weidman',
      images: [
        'DSC_1633.JPG','DSC_1638.JPG','DSC_1649.JPG','DSC_1662.JPG','DSC_1668.JPG',
        'DSC_1685.JPG','DSC_1687.JPG','DSC_1689.JPG','DSC_1692.JPG','DSC_1720.JPG',
        'DSC_1729.JPG','DSC_1805.JPG','DSC_1813.JPG','DSC_1819.JPG','DSC_1837.JPG',
        'DSC_1850.JPG','DSC_1903.JPG','DSC_1904.JPG','DSC_1910.JPG','DSC_1921.JPG',
        'DSC_1937.JPG','DSC_1970.JPG','DSC_2001.JPG','DSC_2004.JPG','DSC_2044.JPG',
        'DSC_2058.JPG','DSC_2187.JPG','DSC_2192.JPG','DSC_2210.JPG','DSC_2214.JPG',
        'DSC_2221.JPG','DSC_2240.JPG','DSC_2256.JPG','DSC_2266.JPG','DSC_2289.JPG',
        'DSC_2334.JPG','DSC_2399.JPG','DSC_2403.JPG','DSC_2409.JPG','DSC_2427.JPG',
        'DSC_2438.JPG','DSC_2450.JPG','DSC_2464.JPG','DSC_2568.JPG','DSC_2571.JPG',
        'DSC_2572.JPG','DSC_2617.JPG','DSC_2632.JPG','DSC_2658.JPG','DSC_2661.JPG',
        'DSC_2663.JPG','DSC_2673.JPG','DSC_2687.JPG','DSC_2688.JPG','DSC_2703.JPG',
        'DSC_2704.JPG','DSC_2717.JPG','DSC_2730.JPG','DSC_2733.JPG','DSC_2756.JPG',
        'DSC_2764.JPG','DSC_2774.JPG','DSC_2797.JPG','DSC_2798.JPG','DSC_2807.JPG',
        'DSC_2809.JPG','DSC_2810.JPG','DSC_2811.JPG','DSC_2816.JPG','DSC_2817.JPG',
        'DSC_2822.JPG','DSC_2838.JPG','DSC_2852.JPG','DSC_2861.JPG','DSC_2871.JPG',
        'DSC_2876.JPG','DSC_2886.JPG','DSC_2891.JPG','DSC_2895.JPG','DSC_2896.JPG',
        'DSC_2900.JPG','DSC_2901.JPG','DSC_2907.JPG','DSC_2914.JPG','DSC_2916.JPG',
        'IMG_3093.JPG','IMG_3159.JPG',
        'сканирование0066.jpg','сканирование0067.jpg','сканирование0068.jpg',
        'сканирование0069.jpg','сканирование0070.jpg','сканирование0071.jpg',
        'сканирование0072.jpg','сканирование0073.jpg','сканирование0074.jpg',
        'сканирование0075.jpg'
      ]
    },
    {
      id: 'good',
      title: 'GOOD',
      year: '',
      folder: '"GOOD", by C.P. Taylor',
      images: [
        'IMG00680-20100919-1258.jpg','IMG00716-20100929-2345.jpg',
        'IMG00717-20100929-2346.jpg','IMG00718-20100929-2348.jpg',
        'IMG00732-20101013-1951.jpg',
        'IMG_4646.JPG','IMG_4652.JPG','IMG_4659.JPG','IMG_4668.JPG','IMG_4670.JPG',
        'IMG_4674.JPG','IMG_4677.JPG','IMG_4682.JPG',
        'IMG_5274.jpg','IMG_5280.JPG','IMG_5284.JPG','IMG_5287.JPG','IMG_5291.JPG',
        'IMG_5293.JPG','IMG_5296.JPG','IMG_5299.JPG','IMG_5301.JPG','IMG_5305.JPG',
        'IMG_5308.JPG','IMG_7128.JPG','IMG_7151.JPG'
      ]
    },
    {
      id: 'hairy-ape',
      title: 'The Hairy Ape',
      year: '',
      folder: '"The Hairy Ape", by Eugene o\'Neill',
      images: [
        'IMG00178-20100217-0103.jpg','IMG00181-20100217-0106.jpg',
        'IMG00184-20100217-0107.jpg','IMG00295-20100507-1659.jpg',
        'IMG00296-20100507-1659.jpg',
        'IMG_0490.JPG','IMG_0543.JPG','IMG_0545.JPG','IMG_0554.JPG','IMG_0555.JPG',
        'IMG_0565.JPG','IMG_0569.JPG','IMG_0573.JPG','IMG_0574.JPG','IMG_0592.JPG',
        'IMG_0600.JPG','IMG_0604.JPG','IMG_0609.JPG','IMG_0680.JPG','IMG_0685.JPG',
        'IMG_0686.JPG','IMG_0693.JPG','IMG_0695.JPG','IMG_0795.JPG','IMG_0813.JPG'
      ]
    },
    {
      id: 'aura',
      title: 'Aura',
      year: '',
      folder: '"Aura" Carlos Fuentes',
      images: [
        'IMG_6507.JPG','IMG_6512.JPG','IMG_6532.JPG','IMG_6545.JPG','IMG_6581.JPG',
        'IMG_6627.JPG','IMG_6656.JPG','IMG_6685.JPG','IMG_6711.JPG','IMG_6730.JPG',
        'IMG_6741.JPG','IMG_6747.JPG','IMG_6813.JPG','IMG_6819.JPG','IMG_6871.JPG'
      ]
    },
    {
      id: 'alzhir',
      title: 'ALZHIR',
      year: '2008',
      folder: '"ALZHIR", 2008',
      images: [
        'IMG_2755.JPG','IMG_2768.JPG','IMG_2779.JPG','IMG_2809.JPG','IMG_2853.JPG',
        'IMG_2899.JPG','IMG_2908.JPG','IMG_2914.JPG','IMG_2932.JPG','IMG_2950.JPG',
        'IMG_2956.JPG','IMG_3012.JPG','IMG_3022.JPG','IMG_3026.JPG','IMG_3047.JPG',
        'IMG_3110.JPG','IMG_3269.JPG','IMG_3270.JPG'
      ]
    },
    {
      id: 'ugly-one',
      title: 'The Ugly One',
      year: '',
      folder: '"The Ugly one " by Marius von Mayenburg',
      images: [
        '1365159036.0137.jpg','3Do2_pqR6FM.jpg','5KWruBlRNPQ.jpg',
        '7iBz3Ffiq-Y.jpg','SLuvg5SQjtY.jpg','UjEActJjczk.jpg','e-faqFlZtaU.jpg'
      ]
    },
    {
      id: 'base-jumping',
      title: 'Base Jumping',
      year: '',
      folder: '"Base Jumping " by Alexander Didenko ',
      images: [
        '13064634_10154230967449686_1933595060803746188_o.jpg',
        '13173349_10154230984209686_5644689766195843620_o.jpg',
        '13221263_10154230965389686_8796655934663139152_o.jpg',
        '13227591_10154230964874686_7997847068962507421_o-2.jpg',
        '13227707_10154230966409686_4866699821904823535_o.jpg',
        'AN_EcbGgyW8.jpg','ArnqcDTKNm8.jpg'
      ]
    },
    {
      id: 'funny-money',
      title: 'Funny Money',
      year: '',
      folder: 'Funny Money',
      images: [
        '-FwZijFuPcA-1.jpg','AcY-Un0SjKs.jpg','P4gGqrRaSCY.jpg',
        'Wr0cE0U0_lY.jpg','Yh3u1RC2aNE.jpg','_eyOeKBBGJg.jpg'
      ]
    },
    {
      id: 'our-lady',
      title: 'Our Lady',
      year: '',
      folder: 'OUR LADY ',
      images: [
        'IMG_7613.JPG','IMG_7617.JPG','IMG_7624.JPG','IMG_7630.JPG',
        'IMG_7631.JPG','IMG_7653.JPG','IMG_7707.JPG','IMG_7783.JPG'
      ]
    },
    {
      id: 'costume',
      title: 'Costume Design',
      year: '',
      folder: 'Costume design',
      images: [
        'IMG_3117.JPG','IMG_3119.JPG','IMG_3120.JPG','IMG_3121.JPG','IMG_3122.JPG',
        'IMG_3123.JPG','IMG_3124.JPG','IMG_3125.JPG','IMG_3126.JPG','IMG_3127.JPG',
        'IMG_3128.JPG','IMG_3129.JPG','IMG_3130.JPG','IMG_3131.JPG','IMG_3132.JPG',
        'IMG_3133.JPG','IMG_3134.JPG','IMG_3136.JPG','IMG_3137.JPG','IMG_3138.JPG',
        'IMG_3294.JPG','IMG_3295.JPG','IMG_3297.JPG','IMG_3298.JPG',
        'IMG_4122.JPG','IMG_4128.JPG','IMG_4130.JPG','IMG_4131.JPG','IMG_4132.JPG',
        'IMG_4146.JPG','IMG_4235.JPG'
      ]
    },
    {
      id: 'renderings',
      title: 'Renderings 2005–2007',
      year: '',
      folder: 'Renderings 2005-2007',
      images: [
        '19112008268.jpg',
        'IMG_3100.JPG','IMG_3102.JPG','IMG_3103.JPG','IMG_3104.JPG','IMG_3105.JPG',
        'IMG_3108.JPG','IMG_3109.JPG','IMG_3114.JPG',
        'IMG_4192.JPG','IMG_4194.JPG','IMG_4195.JPG','IMG_4196.JPG',
        'сканирование0080.jpg','сканирование0081.jpg','сканирование0082.jpg',
        'сканирование0085.jpg','сканирование0086.jpg'
      ]
    },
    {
      id: 'demon-thesis',
      title: 'Demon — Undergraduate Thesis',
      year: '',
      folder: 'Undergraduate Thesis "Demon" opera, by A.Rubinshtain.',
      images: [
        'IMG_2755.JPG','IMG_2768.JPG','IMG_2779.JPG','IMG_2809.JPG','IMG_2853.JPG',
        'IMG_2899.JPG','IMG_2908.JPG','IMG_2914.JPG','IMG_2932.JPG','IMG_2950.JPG',
        'IMG_2956.JPG','IMG_3012.JPG','IMG_3022.JPG','IMG_3026.JPG','IMG_3047.JPG',
        'IMG_3110.JPG','IMG_3269.JPG','IMG_3270.JPG'
      ]
    }
  ];

  /* ── DOM builders ─────────────────────────────────────────────────────────── */

  /** Update a Fine Art category card's cover image. */
  function updateCover(galleryKey, imageSrc) {
    var btn = document.querySelector('[data-gallery="' + galleryKey + '"]');
    if (!btn) return;
    var card = btn.closest('.category-card');
    if (!card) return;
    var img = card.querySelector('img');
    if (img) img.src = imageSrc;
  }

  /** Populate a Fine Art gallery panel grid with artwork cards. */
  function buildFineArtGallery(panelId, basePath, filenames) {
    var grid = document.querySelector('#' + panelId + ' .gallery-grid');
    if (!grid) return;
    grid.innerHTML = filenames.map(function (f, i) {
      return artworkCard(basePath + '/' + encodeURIComponent(f), 'Artwork ' + (i + 1));
    }).join('');
  }

  /** Build theatre production cards and their gallery panels. */
  function buildTheatre() {
    var grid = document.getElementById('theatre-production-grid');
    var panelsEl = document.getElementById('theatre-gallery-panels');
    if (!grid || !panelsEl) return;

    var cards = PRODUCTIONS.map(function (prod) {
      var coverSrc = src('images', 'theatre', prod.folder, prod.images[0]);
      var label = prod.title + (prod.year ? ' (' + prod.year + ')' : '');
      return (
        '<article class="category-card" role="listitem">' +
        '<div class="category-card__image">' +
        '<img src="' + coverSrc + '" alt="' + esc(label) + '" loading="lazy" ' +
        'onerror="this.parentElement.classList.add(\'img-placeholder\')" />' +
        '</div>' +
        '<div class="category-card__body">' +
        '<h3 class="category-card__title">' + esc(prod.title) + '</h3>' +
        (prod.year ? '<p class="category-card__desc">' + esc(prod.year) + '</p>' : '') +
        '<button class="btn btn--text" data-gallery="theatre-' + prod.id + '" ' +
        'aria-expanded="false" aria-controls="gallery-theatre-' + prod.id + '">' +
        'View Works →</button>' +
        '</div>' +
        '</article>'
      );
    }).join('');

    grid.innerHTML = cards;

    var panels = PRODUCTIONS.map(function (prod) {
      var label = prod.title + (prod.year ? ' (' + prod.year + ')' : '');
      var figures = prod.images.map(function (f, i) {
        var imgSrc = src('images', 'theatre', prod.folder, f);
        return artworkCard(imgSrc, 'Photo ' + (i + 1) + ' — ' + prod.title);
      }).join('');
      return (
        '<div id="gallery-theatre-' + prod.id + '" class="gallery-panel" hidden ' +
        'aria-label="' + esc(label) + ' gallery">' +
        '<div class="gallery-panel__header">' +
        '<h3>' + esc(label) + '</h3>' +
        '<button class="gallery-close" data-gallery="theatre-' + prod.id + '" ' +
        'aria-label="Close ' + esc(label) + ' gallery">✕ Close</button>' +
        '</div>' +
        '<div class="gallery-grid">' + figures + '</div>' +
        '</div>'
      );
    }).join('');

    panelsEl.innerHTML = panels;
  }

  /* ── Initialise ───────────────────────────────────────────────────────────── */

  // Update Fine Art category card cover images
  updateCover('drawing',       'images/fine-art/drawing/'       + encodeURIComponent(DRAWING[0]));
  updateCover('painting',      'images/fine-art/painting/'      + encodeURIComponent(PAINTING[0]));
  updateCover('scenic-painting','images/fine-art/scenic-painting/' + encodeURIComponent(SCENIC_PAINTING[0]));

  // Populate Fine Art gallery grids
  buildFineArtGallery('gallery-drawing',        'images/fine-art/drawing',        DRAWING);
  buildFineArtGallery('gallery-painting',       'images/fine-art/painting',       PAINTING);
  buildFineArtGallery('gallery-scenic-painting','images/fine-art/scenic-painting',SCENIC_PAINTING);

  // Build Theatre section
  buildTheatre();

})();

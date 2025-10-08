export const realData = {
  InvoiceId: {
    value: "123100401",
    fragments: [
      {
        page: 1,
        bbox: {
          xmin: 110,
          ymin: 220,
          xmax: 190,
          ymax: 240,
        },
        bbox_norm: {
          xmin: 0.16,
          ymin: 0.31,
          xmax: 0.27,
          ymax: 0.34,
        },
      },
    ],
    confidence: 0.98,
  },
  InvoiceDate: {
    value: "03/01/2024",
    fragments: [
      {
        page: 1,
        bbox: {
          xmin: 460,
          ymin: 220,
          xmax: 520,
          ymax: 240,
        },
        bbox_norm: {
          xmin: 0.72,
          ymin: 0.31,
          xmax: 0.81,
          ymax: 0.34,
        },
      },
    ],
    confidence: 0.95,
  },
  CustomerName: {
    value: "Musterkunde AG",
    fragments: [
      {
        page: 1,
        bbox: {
          xmin: 50,
          ymin: 130,
          xmax: 180,
          ymax: 150,
        },
        bbox_norm: {
          xmin: 0.08,
          ymin: 0.18,
          xmax: 0.28,
          ymax: 0.21,
        },
      },
    ],
    confidence: 0.97,
  },
  CustomerAddressRecipient: {
    value: "Mr. John Doe",
    fragments: [
      {
        page: 1,
        bbox: {
          xmin: 50,
          ymin: 150,
          xmax: 150,
          ymax: 170,
        },
        bbox_norm: {
          xmin: 0.08,
          ymin: 0.21,
          xmax: 0.23,
          ymax: 0.24,
        },
      },
    ],
    confidence: 0.96,
  },
  CustomerAddress: {
    value: "Musterstr. 23, 12345 Musterstadt",
    fragments: [
      {
        page: 1,
        bbox: {
          xmin: 50,
          ymin: 170,
          xmax: 200,
          ymax: 200,
        },
        bbox_norm: {
          xmin: 0.08,
          ymin: 0.24,
          xmax: 0.31,
          ymax: 0.28,
        },
      },
    ],
    confidence: 0.95,
  },
  VendorName: {
    value: "CPB SOFTWARE (GERMANY) GMBH",
    fragments: [
      {
        page: 1,
        bbox: {
          xmin: 420,
          ymin: 50,
          xmax: 580,
          ymax: 80,
        },
        bbox_norm: {
          xmin: 0.66,
          ymin: 0.07,
          xmax: 0.91,
          ymax: 0.11,
        },
      },
    ],
    confidence: 0.98,
  },
  VendorAddressRecipient: {
    value: "Stefanie Müller wqwq",
    fragments: [
      {
        page: 1,
        bbox: {
          xmin: 320,
          ymin: 130,
          xmax: 540,
          ymax: 150,
        },
        bbox_norm: {
          xmin: 0.66, //66
          ymin: 0.23, //18
          xmax: 0.84,
          ymax: 0.21,
        },
      },
    ],
    confidence: 0.96,
  },
  VendorAddress: {
    value: "Im Bruch 3, 63897 Miltenberg",
    fragments: [
      {
        page: 1,
        bbox: {
          xmin: 420,
          ymin: 70,
          xmax: 580,
          ymax: 100,
        },
        bbox_norm: {
          xmin: 0.66,
          ymin: 0.1,
          xmax: 0.91,
          ymax: 0.14,
        },
      },
    ],
    confidence: 0.97,
  },
  SubTotal: {
    value: "381,12 €",
    fragments: [
      {
        page: 1,
        bbox: {
          xmin: 520,
          ymin: 460,
          xmax: 580,
          ymax: 480,
        },
        bbox_norm: {
          xmin: 0.82,
          ymin: 0.65,
          xmax: 0.91,
          ymax: 0.68,
        },
      },
    ],
    confidence: 0.98,
  },
  TotalTax: {
    value: "72,41 €",
    fragments: [
      {
        page: 1,
        bbox: {
          xmin: 520,
          ymin: 480,
          xmax: 580,
          ymax: 500,
        },
        bbox_norm: {
          xmin: 0.82,
          ymin: 0.68,
          xmax: 0.91,
          ymax: 0.71,
        },
      },
    ],
    confidence: 0.98,
  },
  InvoiceTotal: {
    value: "453,53 €",
    fragments: [
      {
        page: 1,
        bbox: {
          xmin: 520,
          ymin: 500,
          xmax: 580,
          ymax: 520,
        },
        bbox_norm: {
          xmin: 0.82,
          ymin: 0.71,
          xmax: 0.91,
          ymax: 0.74,
        },
      },
    ],
    confidence: 0.99,
  },
  AmountDue: {
    value: "453,53 €",
    fragments: [
      {
        page: 1,
        bbox: {
          xmin: 520,
          ymin: 500,
          xmax: 580,
          ymax: 520,
        },
        bbox_norm: {
          xmin: 0.82,
          ymin: 0.71,
          xmax: 0.91,
          ymax: 0.74,
        },
      },
    ],
    confidence: 0.99,
  },
  Items: [
    {
      Amount: {
        value: "130,00 €",
        fragments: [
          {
            page: 1,
            bbox: {
              xmin: 320,
              ymin: 280,
              xmax: 370,
              ymax: 300,
            },
            bbox_norm: {
              xmin: 0.5,
              ymin: 0.4,
              xmax: 0.58,
              ymax: 0.43,
            },
          },
        ],
        confidence: 0.97,
      },
      Description: {
        value: "Basic Fee wmView",
        fragments: [
          {
            page: 1,
            bbox: {
              xmin: 50,
              ymin: 280,
              xmax: 250,
              ymax: 300,
            },
            bbox_norm: {
              xmin: 0.08,
              ymin: 0.4,
              xmax: 0.39,
              ymax: 0.43,
            },
          },
        ],
        confidence: 0.98,
      },
      Quantity: {
        value: "1",
        fragments: [
          {
            page: 1,
            bbox: {
              xmin: 400,
              ymin: 280,
              xmax: 420,
              ymax: 300,
            },
            bbox_norm: {
              xmin: 0.62,
              ymin: 0.4,
              xmax: 0.65,
              ymax: 0.43,
            },
          },
        ],
        confidence: 0.99,
      },
      UnitPrice: {
        value: "130,00 €",
        fragments: [
          {
            page: 1,
            bbox: {
              xmin: 320,
              ymin: 280,
              xmax: 370,
              ymax: 300,
            },
            bbox_norm: {
              xmin: 0.5,
              ymin: 0.4,
              xmax: 0.58,
              ymax: 0.43,
            },
          },
        ],
        confidence: 0.97,
      },
    },
    {
      Amount: {
        value: "0,00 €",
        fragments: [
          {
            page: 1,
            bbox: {
              xmin: 520,
              ymin: 300,
              xmax: 580,
              ymax: 320,
            },
            bbox_norm: {
              xmin: 0.82,
              ymin: 0.43,
              xmax: 0.91,
              ymax: 0.46,
            },
          },
        ],
        confidence: 0.96,
      },
      Description: {
        value: "Basis fee for additional user accounts",
        fragments: [
          {
            page: 1,
            bbox: {
              xmin: 50,
              ymin: 300,
              xmax: 300,
              ymax: 320,
            },
            bbox_norm: {
              xmin: 0.08,
              ymin: 0.43,
              xmax: 0.47,
              ymax: 0.46,
            },
          },
        ],
        confidence: 0.97,
      },
      Quantity: {
        value: "0",
        fragments: [
          {
            page: 1,
            bbox: {
              xmin: 400,
              ymin: 300,
              xmax: 420,
              ymax: 320,
            },
            bbox_norm: {
              xmin: 0.62,
              ymin: 0.43,
              xmax: 0.65,
              ymax: 0.46,
            },
          },
        ],
        confidence: 0.99,
      },
      UnitPrice: {
        value: "10,00 €",
        fragments: [
          {
            page: 1,
            bbox: {
              xmin: 320,
              ymin: 300,
              xmax: 370,
              ymax: 320,
            },
            bbox_norm: {
              xmin: 0.5,
              ymin: 0.43,
              xmax: 0.58,
              ymax: 0.46,
            },
          },
        ],
        confidence: 0.97,
      },
    },
    {
      Amount: {
        value: "8,12 €",
        fragments: [
          {
            page: 1,
            bbox: {
              xmin: 520,
              ymin: 360,
              xmax: 580,
              ymax: 380,
            },
            bbox_norm: {
              xmin: 0.82,
              ymin: 0.51,
              xmax: 0.91,
              ymax: 0.54,
            },
          },
        ],
        confidence: 0.98,
      },
      Description: {
        value: "Transaction Fee T1",
        fragments: [
          {
            page: 1,
            bbox: {
              xmin: 50,
              ymin: 360,
              xmax: 250,
              ymax: 380,
            },
            bbox_norm: {
              xmin: 0.08,
              ymin: 0.51,
              xmax: 0.39,
              ymax: 0.54,
            },
          },
        ],
        confidence: 0.98,
      },
      Quantity: {
        value: "14",
        fragments: [
          {
            page: 1,
            bbox: {
              xmin: 400,
              ymin: 360,
              xmax: 430,
              ymax: 380,
            },
            bbox_norm: {
              xmin: 0.62,
              ymin: 0.51,
              xmax: 0.67,
              ymax: 0.54,
            },
          },
        ],
        confidence: 0.99,
      },
      UnitPrice: {
        value: "0,58 €",
        fragments: [
          {
            page: 1,
            bbox: {
              xmin: 320,
              ymin: 360,
              xmax: 370,
              ymax: 380,
            },
            bbox_norm: {
              xmin: 0.5,
              ymin: 0.51,
              xmax: 0.58,
              ymax: 0.54,
            },
          },
        ],
        confidence: 0.97,
      },
    },
    {
      Amount: {
        value: "243,00 €",
        fragments: [
          {
            page: 1,
            bbox: {
              xmin: 520,
              ymin: 400,
              xmax: 580,
              ymax: 420,
            },
            bbox_norm: {
              xmin: 0.82,
              ymin: 0.57,
              xmax: 0.91,
              ymax: 0.6,
            },
          },
        ],
        confidence: 0.98,
      },
      Description: {
        value: "Transaction Fee T3",
        fragments: [
          {
            page: 1,
            bbox: {
              xmin: 50,
              ymin: 400,
              xmax: 250,
              ymax: 420,
            },
            bbox_norm: {
              xmin: 0.08,
              ymin: 0.57,
              xmax: 0.39,
              ymax: 0.6,
            },
          },
        ],
        confidence: 0.98,
      },
      Quantity: {
        value: "162",
        fragments: [
          {
            page: 1,
            bbox: {
              xmin: 400,
              ymin: 400,
              xmax: 440,
              ymax: 420,
            },
            bbox_norm: {
              xmin: 0.62,
              ymin: 0.57,
              xmax: 0.69,
              ymax: 0.6,
            },
          },
        ],
        confidence: 0.99,
      },
      UnitPrice: {
        value: "1,50 €",
        fragments: [
          {
            page: 1,
            bbox: {
              xmin: 320,
              ymin: 400,
              xmax: 370,
              ymax: 420,
            },
            bbox_norm: {
              xmin: 0.5,
              ymin: 0.57,
              xmax: 0.58,
              ymax: 0.6,
            },
          },
        ],
        confidence: 0.97,
      },
    },
  ],
};
export const mergeData = {
  InvoiceId: {
    value: "CCU1-4632921",
    coords: {
      xMin: 0.7976753115653992,
      xMax: 0.9250699281692505,
      yMin: 0.3924764394760132,
      yMax: 0.40317535400390625,
    },
    confidence: 0.98,
    pageNumber: 2,
  },
  InvoiceDetails: {
    value: "WB-CCU1-1034-2122",
    coords: {
      xMin: 0.7428610324859619,
      xMax: 0.9275079965591431,
      yMin: 0.41028815507888794,
      yMax: 0.4209343492984772,
    },
    confidence: 0.98,
    pageNumber: 2,
  },
  InvoiceDate: {
    value: "04.02.2022",
    coords: {
      xMin: 0.8331258893013,
      xMax: 0.9278013110160828,
      yMin: 0.42817461490631104,
      yMax: 0.43843984603881836,
    },
    confidence: 0.95,
    pageNumber: 2,
  },
  OrderNumber: {
    value: "402-5005041-4753952",
    coords: {
      xMin: 0.2114754319190979,
      xMax: 0.4026195704936981,
      yMin: 0.39270320534706116,
      yMax: 0.40324562788009644,
    },
    confidence: 0.98,
    pageNumber: 2,
  },
  OrderDate: {
    value: "04.02.2022",
    coords: {
      xMin: 0.8331258893013,
      xMax: 0.9278013110160828,
      yMin: 0.42817461490631104,
      yMax: 0.43843984603881836,
    },
    confidence: 0.95,
    pageNumber: 2,
  },
  PanNumber: {
    value: "AALCA0171E",
    coords: {
      xMin: 0.15332373976707458,
      xMax: 0.26992496848106384,
      yMin: 0.28112319111824036,
      yMax: 0.29192155599594116,
    },
    confidence: 0.95,
    pageNumber: 2,
  },
  GSTNumber: {
    value: "19AALCA0171E1ZW",
    coords: {
      xMin: 0.26910388469696045,
      xMax: 0.4457119107246399,
      yMin: 0.2970959544181824,
      yMax: 0.307718425989151,
    },
    confidence: 0.95,
    pageNumber: 2,
  },
  SoldBy: {
    value: "Appario",
    coords: {
      xMin: 0.07175516337156296,
      xMax: 0.13674481213092804,
      yMin: 0.13824962079524994,
      yMax: 0.1514284908771515,
    },
    confidence: 0.95,
    pageNumber: 2,
  },
  CustomerName: {
    value: "SOUVIK",
    coords: {
      xMin: 0.7748875617980957,
      xMax: 0.8462720513343811,
      yMin: 0.13774703443050385,
      yMax: 0.14887213706970215,
    },
    confidence: 0.97,
    pageNumber: 2,
  },
  UTC: {
    value: "19",
    coords: {
      xMin: 0.9084844589233398,
      xMax: 0.9278416633605957,
      yMin: 0.2009667009115219,
      yMax: 0.21139360964298248,
    },
    confidence: 0.96,
    pageNumber: 2,
  },
  ShippingAddress: {
    value: "Madhyamgram",
    coords: {
      xMin: 0.582531750202179,
      xMax: 0.7118474245071411,
      yMin: 0.3093778192996979,
      yMax: 0.3227783143520355,
    },
    confidence: 0.95,
    pageNumber: 2,
  },
  ShippingUTC: {
    value: "19",
    coords: {
      xMin: 0.902808427810669,
      xMax: 0.9225210547447205,
      yMin: 0.3409448266029358,
      yMax: 0.3515506088733673,
    },
    confidence: 0.98,
    pageNumber: 2,
  },
  PlaceOfSupply: {
    value: "WEST",
    coords: {
      xMin: 0.786051869392395,
      xMax: 0.8407647013664246,
      yMin: 0.35659533739089966,
      yMax: 0.3671344816684723,
    },
    confidence: 0.98,
    pageNumber: 2,
  },
  PlaceOfDelivery: {
    value: "BENGAL",
    coords: {
      xMin: 0.8519812226295471,
      xMax: 0.9278797507286072,
      yMin: 0.37252888083457947,
      yMax: 0.38314545154571533,
    },
    confidence: 0.98,
    pageNumber: 2,
  },
  SubTotal: {
    value: "₹11,425.42",
    coords: {
      xMin: 0.7579059600830078,
      xMax: 0.8336596488952637,
      yMin: 0.5521033406257629,
      yMax: 0.5631995797157288,
    },
    confidence: 0.98,
    pageNumber: 2,
  },
  TaxRate: {
    value: "9%",
    coords: {
      xMin: 0.6749393939971924,
      xMax: 0.6969334483146667,
      yMin: 0.5013430118560791,
      yMax: 0.5138649940490723,
    },
    confidence: 0.98,
    pageNumber: 2,
  },
  InvoiceTotal: {
    value: "₹74,900.00",
    coords: {
      xMin: 0.8401179313659668,
      xMax: 0.9235386848449707,
      yMin: 0.5026443004608154,
      yMax: 0.5139396786689758,
    },
    confidence: 0.99,
    pageNumber: 2,
  },
  AmountDue: {
    value: "₹74,900.00",
    coords: {
      xMin: 0.8380323052406311,
      xMax: 0.9261986017227173,
      yMin: 0.5522004961967468,
      yMax: 0.563302218914032,
    },
    confidence: 0.99,
    pageNumber: 2,
  },
  Items: [
    {
      Amount: {
        value: "₹63,474.58",
        coords: {
          xMin: 0.5871889591217041,
          xMax: 0.6615016460418701,
          yMin: 0.5024150013923645,
          yMax: 0.5138499140739441,
        },
        confidence: 0.97,
        pageNumber: 2,
      },
      TaxRate: {
        value: "9%",
        coords: {
          xMin: 0.6749393939971924,
          xMax: 0.6969334483146667,
          yMin: 0.5013430118560791,
          yMax: 0.5138649940490723,
        },
        confidence: 0.97,
        pageNumber: 2,
      },
      TaxType: {
        value: "CGST",
        coords: {
          xMin: 0.7112862467765808,
          xMax: 0.7532598972320557,
          yMin: 0.5025510191917419,
          yMax: 0.5113227963447571,
        },
        confidence: 0.97,
        pageNumber: 2,
      },
      TaxAmount: {
        value: "₹5,712.71",
        coords: {
          xMin: 0.7657257318496704,
          xMax: 0.8254645466804504,
          yMin: 0.5026872158050537,
          yMax: 0.5138202905654907,
        },
        confidence: 0.97,
        pageNumber: 2,
      },
      Description: {
        value: "Apple",
        coords: {
          xMin: 0.10768010467290878,
          xMax: 0.14633913338184357,
          yMin: 0.4903014898300171,
          yMax: 0.5008167028427124,
        },
        confidence: 0.28,
        pageNumber: 2,
      },
      Quantity: {
        value: "1",
        coords: {
          xMin: 0.5676699876785278,
          xMax: 0.5734243392944336,
          yMin: 0.5047290325164795,
          yMax: 0.5121617913246155,
        },
        confidence: 0.8,
        pageNumber: 2,
      },
      UnitPrice: {
        value: "₹63,474.58",
        coords: {
          xMin: 0.4791051149368286,
          xMax: 0.5529513359069824,
          yMin: 0.5024834275245667,
          yMax: 0.5138744115829468,
        },
        confidence: 0.97,
        pageNumber: 2,
      },
    },
  ],
};

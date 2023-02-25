import * as d3 from 'd3';

const TreeDiagram = () => {
  // let width = 400
  // let height = 200

  let data = [
    {
      Title: 'Adaptation',
      Distributor: 'Sony Pictures',
      Genre: 'Comedy',
      Worldwide_Gross: 22498520,
      Rating: 91,
    },
    {
      Title: 'Air Bud',
      Distributor: 'Walt Disney Pictures',
      Genre: 'Comedy',
      Worldwide_Gross: 27555061,
      Rating: 45,
    },
    {
      Title: 'Air Force One',
      Distributor: 'Sony Pictures',
      Genre: 'Action',
      Worldwide_Gross: 315268353,
      Rating: 78,
    },
    {
      Title: 'Alex & Emma',
      Distributor: 'Warner Bros.',
      Genre: 'Drama',
      Worldwide_Gross: 15358583,
      Rating: 11,
    },
    {
      Title: 'Alexander',
      Distributor: 'Warner Bros.',
      Genre: 'Adventure',
      Worldwide_Gross: 167297191,
      Rating: 16,
    },
    {
      Title: 'Ali',
      Distributor: 'Sony Pictures',
      Genre: 'Drama',
      Worldwide_Gross: 84383966,
      Rating: 67,
    },
    {
      Title: 'Alice in Wonderland',
      Distributor: 'Walt Disney Pictures',
      Genre: 'Adventure',
      Worldwide_Gross: 1023291110,
      Rating: 51,
    },
    {
      Title: 'Alive',
      Distributor: 'Walt Disney Pictures',
      Genre: 'Adventure',
      Worldwide_Gross: 36299670,
      Rating: 71,
    },
    {
      Title: "All the King's Men",
      Distributor: 'Sony Pictures',
      Genre: 'Drama',
      Worldwide_Gross: 9521458,
      Rating: 11,
    },
    {
      Title: 'Amadeus',
      Distributor: 'Warner Bros.',
      Genre: 'Drama',
      Worldwide_Gross: 51973029,
      Rating: 96,
    },
  ];

  let groups = d3.rollup(
    data,
    function (d) {
      return d.length;
    },
    function (d) {
      return d.Distributor;
    },
    function (d) {
      return d.Genre;
    }
  );

  console.log(...groups, 'groups');

  let root = d3.hierarchy(groups);

  console.log('ROOT', ...root);

  root.sum(function (d) {
    return d[1];
  });

  let treeLayout = d3.tree().size([650, 350]);

  treeLayout(root);

  // Links
  d3.select('svg g')
    .selectAll('line')
    .data(root.links())
    .join('line')
    .attr('x1', function (d) {
      return d.source.x;
    })
    .attr('y1', function (d) {
      return d.source.y;
    })
    .attr('x2', function (d) {
      return d.target.x;
    })
    .attr('y2', function (d) {
      return d.target.y;
    });

  // Nodes
  d3.select('svg g')
    .selectAll('circle')
    .data(root.descendants())
    .join('circle')
    .attr('cx', function (d) {
      return d.x;
    })
    .attr('cy', function (d) {
      return d.y;
    })
    .attr('r', 7);

  // Labels
  d3.select('svg g')
    .selectAll('text.label')
    .data(root.descendants())
    .join('text')
    .classed('label', true)
    .attr('x', function (d) {
      return d.x;
    })
    .attr('y', function (d) {
      return d.y - 18;
    })
    .text(function (d) {
      return d.data[0];
    });

  // Leaf count labels
  d3.select('svg g')
    .selectAll('text.count-label')
    .data(root.descendants())
    .join('text')
    .classed('count-label', true)
    .attr('x', function (d) {
      return d.x;
    })
    .attr('y', function (d) {
      return d.y + 20;
    })
    .text(function (d) {
      if (d.height > 0) return '';
      return d.data[1];
    });
};

export default TreeDiagram;

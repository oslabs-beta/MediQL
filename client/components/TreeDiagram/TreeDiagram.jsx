import React, { useState, useEffect } from 'react';
// const io = require('socket.io-client');
import * as d3 from 'd3';

// const socket = io('http://localhost:3000/queryResponseReceiver');
// const socket = io();

const TreeDiagram = ({ queryData, originData }) => {
  console.log('querydata--->', queryData);
  console.log('origindata--->', originData);
  

  
  if (queryData[0] !== null) {
    let root = d3.hierarchy(queryData[0]);

    //hardcoded
    // let root = d3.hierarchy({"name":"data","children":[{"status":200,"name":"movie1","children":[{"name":"title","children":[{"name":"Attack of the Clones"}]},{"name":"director","children":[{"name":"George Lucas"}]}]},{"status":200,"name":"movie2","children":[{"name":"title","children":[{"name":"Return of the Jedi"}]},{"name":"director","children":[{"name":"Richard Marquand"}]}]},{"status":404,"name":"person1","children":[{"name":"name","children":[]},{"name":"birth_year","children":[]}]},{"name":"country100","children":[]}]});

    let originRoot = d3.hierarchy(originData);
    console.log('originRoot-->', originRoot)
    console.log('ROOT, ', root);

    let treeLayout = d3.tree().size([650, 350]);

    treeLayout(root);

    // Links
    d3.select('svg g')
      .selectAll('line')
      .data(root.links())
      .join('line')
      .attr('x1', function (d) {
        console.log('d in x1', d);
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
      .attr('r', 7)
      .attr('fill', (d) => {
        // console.log('d in attr for fill : ', d);
        console.log('d.data-->', d.data)

        if (d.data.children !== undefined && !d.data.children.length) {
          console.log('THIS CHILD IS LENGTH OF 0')
           return 'orange';
         } 
        else if (d.data.status > 299) {
          return 'red';
        }
        else {
          return 'green';
        }
      })

    const nodes = d3.selectAll('circle');

    // Add an event listener to each node that listens for a click event
    nodes.on('click', function (d) {
      // Create a div for the pop-up and position it relative to the clicked node
      const popup = d3
        .select('body')
        .append('div')
        .classed('popup', true)
        .style('position', 'absolute')
        .style('left', d.x + 'px')
        .style('top', d.y + 'px');

      // Add content to the pop-up
      // popup.append('h2').text('More Information: ');

      popup.append('p').text((d) => {
        console.log('d.data.status in append: ', d.data);
        if (d.data > 299) {
          console.log('STATUS OVER 299')
          return `originRespStatus: ${d.data}, originRespMessage: `
        }
        return 'originRespStatus: 200, originRespMessage: "OK"'
      });

      // Add a close button to the pop-up
      popup
        .append('button')
        .text('Close')
        .on('click', function () {
          // Remove the pop-up from the DOM when the close button is clicked
          popup.remove();
        });
    });

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
        // console.log('d in labels', d);
        return d.data.name;
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
        // console.log('d in leaf count labels', d);
        return d.data[1];
      });
  }

  return (
    <div className='container'>
      <svg id="tree-d" width="700" height="600">
        <g transform="translate(0, 5)"></g>
      </svg>
    </div>
  );
};

export default TreeDiagram;

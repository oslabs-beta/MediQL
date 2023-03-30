import React, { useState, useEffect } from 'react';
// const io = require('socket.io-client');
import * as d3 from 'd3';

// const socket = io('http://localhost:3000/queryResponseReceiver');
// const socket = io();
interface Data {
  name: string | null;
  children: Data[] | null;
}

interface TreeDiagramProps {
  data: Data[];
}

const TreeDiagram = ({ data }: TreeDiagramProps) => {
  console.log(data);

  if (data[0] !== null) {
    // let root = d3.hierarchy<Data>(data[0]);

    // console.log('ROOT, ', root);
    // root.sum(function (d) {
    //   console.log('d in root sum', d[1], 'd[0]', d[0]);
    //   return d[1];
    // });

    let root = d3.hierarchy<Data>({
      name: 'data',
      children: [
        {
          status: 200,
          name: 'movie1',
          children: [
            { name: 'title', children: [{ name: 'Attack of the Clones' }] },
            { name: 'director', children: [{ name: 'George Lucas' }] },
          ],
        },
        {
          status: 200,
          name: 'movie2',
          children: [
            { name: 'title', children: [{ name: 'Return of the Jedi' }] },
            { name: 'director', children: [{ name: 'Richard Marquand' }] },
          ],
        },
        {
          status: 404,
          name: 'person1',
          children: [
            { name: 'name', children: [] },
            { name: 'birth_year', children: [] },
          ],
        },
        { name: 'country100', children: [] },
      ],
    });

    let treeLayout = d3.tree<Data>().size([650, 350]);

    let rootNode = treeLayout(root) as d3.HierarchyPointNode<Data>;

    // MAY NEED TO UNCOMMENT
    // treeLayout(root);

    // Links
    d3.select('svg g')
      .selectAll('line')
      .data(rootNode.links())
      .join('line')
      .attr('x1', function (d) {
        // console.log('d in x1', d);
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
      .data(rootNode.descendants())
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
        console.log('d.data-->', d.data);

        if (d.data.children !== undefined && !d.data.children?.length) {
          console.log('THIS CHILD IS LENGTH OF 0');
          return 'orange';
        } else if (d.data.status > 299) {
          return 'red';
        } else {
          return 'green';
        }
      })
      .on('click', (event, d) => {
        // Create popup
        if (document.getElementById('popup-data')) {
          const popup = document.createElement('div');
          popup.style.position = 'absolute';
          popup.style.top = `${event.pageY}px`;
          popup.style.left = `${event.pageX}px`;
          popup.style.backgroundColor = 'white';
          popup.style.padding = '30px';
          popup.style.border = '1px solid black';
          popup.setAttribute('width', '100px');
          popup.setAttribute('height', '100px');
          popup.setAttribute('id', 'popup-data');

          console.log(popup, 'popup');
          console.log(d.data, 'd.data after popup log');
          console.log(d.data.status, 'bout to get this statussssssss');

          popup.innerText = `Status Code : ${d.data.status}`;
          let button = document.createElement('button');
          button.innerText = 'Close';
          button.addEventListener('click', function () {
            // Remove the pop-up from the DOM when the close button is clicked
            popup.remove();
          });
          popup.append(button);

          //   // Populate popup with data
          //   const dataString = JSON.stringify(d.data, null, 2);
          //   const popupContent = document.createTextNode(dataString);
          //   popup.appendChild(popupContent);

          //   // Add popup to document
          //   document.body.appendChild(popup);

          //Remove popup on click outside of popup
          // popup.addEventListener('click', (event) => {
          //   console.log('hello');
          // });
          // document.addEventListener(
          //   'click',
          //   () => {
          //     document.body.removeChild(popup);
          //   },
          //   { once: true }
          // );

          document.body.appendChild(popup);
        }
      });

    // console.log('d.data.status in append: ', d.data.status);
    //   if (d.data > 299) {
    //     console.log('STATUS OVER 299')
    //     return `originRespStatus: ${d.data}, originRespMessage: `
    //   }
    //   return 'originRespStatus: 200, originRespMessage: "OK"'
    // });

    // const nodes = d3.selectAll('circle');

    // // Add an event listener to each node that listens for a click event
    // nodes.on('click', function (d) {
    //   // Create a div for the pop-up and position it relative to the clicked node
    //   const popup = d3
    //     .select('body')
    //     .append('div')
    //     .data(root.descendants())
    //     .classed('popup', true)
    //     .style('position', 'absolute')
    //     .style('left', d.x + 'px')
    //     .style('top', d.y + 'px');

    //   // Add content to the pop-up
    //   popup.append('h2').text('More Information: ');

    //   // popup.append('p').text((d) => {
    //   //   console.log('d in append: ', d);
    //   //   //   if(d.data.name === null){
    //   //   //   return 'originRespStatus: 404, originRespMessage: "NOT FOUND"'
    //   //   // }
    //   //   // else{
    //   //   //   return 'originRespStatus: 200, originRespMessage: "OK"'
    //   //   // }
    //   // });

    //   // Add a close button to the pop-up
    //   popup
    //     .append('button')
    //     .text('Close')
    //     .on('click', function () {
    //       // Remove the pop-up from the DOM when the close button is clicked
    //       popup.remove();
    //     });
    // });

    // Labels
    d3.select('svg g')
      .selectAll('text.label')
      .data(rootNode.descendants())
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
      .data(rootNode.descendants())
      .join('text')
      .classed('count-label', true)
      .attr('x', function (d) {
        return d.x;
      })
      .attr('y', function (d) {
        return d.y + 20;
      });
    // .text(function (d) {
    //   if (d.height > 0) return '';
    //   // console.log('d in leaf count labels', d);
    //   return d.data[1];
    // });
  }

  return (
    <>
      <svg id="tree-d" width="700" height="600">
        <g transform="translate(0, 5)"></g>
      </svg>
    </>
  );
};

export default TreeDiagram;

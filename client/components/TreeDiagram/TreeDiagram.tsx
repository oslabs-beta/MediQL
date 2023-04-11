import React, { useState, useEffect, useRef } from 'react';

import * as d3 from 'd3';

interface Data {
  name: string | null;
  children: Data[] | null;
}

interface TreeDiagramProps {
  data: Data[];
}

const TreeDiagram = ({ data }: TreeDiagramProps) => {
  //connects to the DOM and the SVG element returned below
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    console.log('data: ', data);

    if (data !== null) {
      let root = d3.hierarchy<Data>(data);

      let levelWidth = [1];
      let childCount = function (level: number, n: d3.HierarchyNode<Data>) {
        if (n.children && n.children.length > 0) {
          if (levelWidth.length <= level + 1) levelWidth.push(0);

          levelWidth[level + 1] += n.children.length;
          n.children.forEach(function (d) {
            childCount(level + 1, d);
          });
        }
      };
      childCount(0, root);
      console.log('level width: ', levelWidth);
      let treeHeight = d3.max(levelWidth) * 65;
      let treeLayout = d3.tree<Data>().size([treeHeight, 350]);

      let rootNode = treeLayout(root) as d3.HierarchyPointNode<Data>;

      // Links
      d3.select('svg g')
        .selectAll('line')
        .data(rootNode.links())
        .join('line')
        .attr('x1', function (d) {
          return d.source.y;
        })
        .attr('y1', function (d) {
          return d.source.x;
        })
        .attr('x2', function (d) {
          return d.target.y;
        })
        .attr('y2', function (d) {
          return d.target.x;
        });

      // Nodes
      d3.select('svg g')
        .selectAll('circle')
        .data(rootNode.descendants())
        .join('circle')
        .attr('cx', function (d) {
          return d.y;
        })
        .attr('cy', function (d) {
          return d.x;
        })
        .attr('r', 7)
        .attr('fill', (d) => {
          // console.log('d.data-->', d.data);

          if (d.data.children !== undefined && !d.data.children?.length) {
            // console.log('THIS CHILD IS LENGTH OF 0');
            return 'orange';
          } else if (d.data.statusCode > 299) {
            return 'red';
          } else {
            return 'green';
          }
        })
        .on('click', (event, d) => {
          // Create popup
          if (!document.getElementById('popup-data')) {
            const popup = document.createElement('div');
            popup.style.position = 'absolute';
            popup.style.top = `${event.pageX * 2}px`;
            popup.style.left = `${event.pageY * 2}px`;
            popup.style.backgroundColor = 'white';
            popup.style.padding = '30px';
            popup.style.border = '1px solid black';
            popup.setAttribute('width', '100px');
            popup.setAttribute('height', '100px');
            popup.setAttribute('id', 'popup-data');

            popup.innerText = `Status Code : ${d.data.statusCode}`;
            let button = document.createElement('button');
            button.innerText = 'Close';
            button.addEventListener('click', function () {
              // Remove the pop-up from the DOM when the close button is clicked
              popup.remove();
            });
            popup.append(button);
            document.body.appendChild(popup);
          }
        });

      // Labels
      d3.select('svg g')
        .selectAll('text.label')
        .data(rootNode.descendants())
        .join('text')
        .classed('label', true)
        .attr('x', function (d) {
          return d.y;
        })
        .attr('y', function (d) {
          return d.x - 10;
        })
        .text(function (d) {
          return d.data.name;
        });

      // Leaf count labels
      d3.select('svg g')
        .selectAll('text.count-label')
        .data(rootNode.descendants())
        .join('text')
        .classed('count-label', true)
        .attr('x', function (d) {
          return d.y + 20;
        })
        .attr('y', function (d) {
          return d.x;
        });

      //set view box
      let dimensions = (d3.select('svg g').node() as SVGGElement).getBBox();

      console.log('dimensions', dimensions);

      let targetTreeD = document.getElementById('tree-d');
      targetTreeD?.setAttribute(
        'viewBox',
        `${0} 
         ${dimensions.x}
         ${dimensions.width * 1.5}
         ${dimensions.height * 1.1}`
      );
    }
  });
  return (
    <>
      <svg id="tree-d">
        <g transform="translate(30, 0)"></g>
      </svg>
    </>
  );
};

export default TreeDiagram;

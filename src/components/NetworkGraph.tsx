"use client";

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface NetworkNode extends d3.SimulationNodeDatum {
  id: string;
  type: 'drug' | 'disease';
  name: string;
  confidence?: number;
}

interface NetworkLink extends d3.SimulationLinkDatum<NetworkNode> {
  source: string | NetworkNode;
  target: string | NetworkNode;
  confidence: number;
}

interface NetworkGraphProps {
  drug: string;
  applications: Array<{ disease: string; confidence: number }>;
  isDark: boolean;
}

export default function NetworkGraph({ drug, applications, isDark }: NetworkGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !applications.length) return;

    // Clear previous graph
    d3.select(svgRef.current).selectAll("*").remove();

    // Create nodes and links
    const nodes: NetworkNode[] = [
      { id: drug, type: 'drug', name: drug },
      ...applications.map(app => ({
        id: app.disease,
        type: 'disease' as const,
        name: app.disease,
        confidence: app.confidence
      }))
    ];

    const links: NetworkLink[] = applications.map(app => ({
      source: drug,
      target: app.disease,
      confidence: app.confidence
    }));

    // Set up SVG
    const svg = d3.select(svgRef.current);
    const width = 600;
    const height = 400;
    
    svg.attr("width", width).attr("height", height);

    // Create simulation
    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink<NetworkNode, NetworkLink>(links).id(d => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2));

    // Create links
    const link = svg.append("g")
      .selectAll("line")
      .data(links)
      .enter().append("line")
      .attr("stroke", isDark ? "#64748b" : "#94a3b8")
      .attr("stroke-width", (d: NetworkLink) => Math.max(1, d.confidence / 20))
      .attr("opacity", 0.6);

    // Create nodes
    const node = svg.append("g")
      .selectAll("circle")
      .data(nodes)
      .enter().append("circle")
      .attr("r", (d: NetworkNode) => d.type === 'drug' ? 20 : 15)
      .attr("fill", (d: NetworkNode) => d.type === 'drug' ? "#3b82f6" : "#8b5cf6")
      .attr("stroke", isDark ? "#1e293b" : "#f1f5f9")
      .attr("stroke-width", 2);

    // Add labels
    const labels = svg.append("g")
      .selectAll("text")
      .data(nodes)
      .enter().append("text")
      .text((d: NetworkNode) => d.name)
      .attr("font-size", "12px")
      .attr("fill", isDark ? "#e2e8f0" : "#334155")
      .attr("text-anchor", "middle")
      .attr("dy", -25);

    // Add confidence labels for diseases
    const confidenceLabels = svg.append("g")
      .selectAll("text.confidence")
      .data(nodes.filter(n => n.type === 'disease'))
      .enter().append("text")
      .attr("class", "confidence")
      .text((d: NetworkNode) => `${d.confidence}%`)
      .attr("font-size", "10px")
      .attr("fill", isDark ? "#94a3b8" : "#64748b")
      .attr("text-anchor", "middle")
      .attr("dy", 25);

    // Update positions on simulation tick
    simulation.on("tick", () => {
      link
        .attr("x1", (d: NetworkLink) => (d.source as NetworkNode).x || 0)
        .attr("y1", (d: NetworkLink) => (d.source as NetworkNode).y || 0)
        .attr("x2", (d: NetworkLink) => (d.target as NetworkNode).x || 0)
        .attr("y2", (d: NetworkLink) => (d.target as NetworkNode).y || 0);

      node
        .attr("cx", (d: NetworkNode) => d.x || 0)
        .attr("cy", (d: NetworkNode) => d.y || 0);

      labels
        .attr("x", (d: NetworkNode) => d.x || 0)
        .attr("y", (d: NetworkNode) => d.y || 0);

      confidenceLabels
        .attr("x", (d: NetworkNode) => d.x || 0)
        .attr("y", (d: NetworkNode) => d.y || 0);
    });

    return () => {
      simulation.stop();
    };
  }, [drug, applications, isDark]);

  return (
    <div className="flex justify-center">
      <svg ref={svgRef} className="border rounded-lg" style={{ background: isDark ? '#0f172a' : '#f8fafc' }} />
    </div>
  );
}
import { jsPDF } from 'jspdf';
import { Freelancer } from '../data/freelancers';

export const generateFreelancerPDF = (freelancer: Freelancer): void => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(22);
  doc.text(`${freelancer.name} - ${freelancer.role}`, 20, 20);
  
  // Add availability status
  doc.setFontSize(14);
  doc.text(`Status: ${freelancer.availability}`, 20, 35);
  
  // Add bio
  doc.setFontSize(12);
  doc.text('Bio:', 20, 50);
  doc.text(freelancer.bio, 20, 60);
  
  // Add skills
  doc.text('Skills:', 20, 80);
  freelancer.skills.forEach((skill, index) => {
    doc.text(`- ${skill}`, 25, 90 + (index * 7));
  });
  
  // Add contact info
  doc.text('For more information, contact Rishidar:', 20, 140);
  doc.text('Email: contact@example.com', 20, 150);
  doc.text('Phone: +1 (123) 456-7890', 20, 160);
  
  // Save the PDF
  doc.save(`${freelancer.name.replace(/\s+/g, '_')}_profile.pdf`);
};

export const generateTeamPDF = (freelancers: Freelancer[]): void => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(22);
  doc.text('Team Profile', 20, 20);
  
  // Add team description
  doc.setFontSize(12);
  doc.text(`A curated team of ${freelancers.length} freelancers selected for your project.`, 20, 30);
  
  let yPosition = 50;
  
  // Add each freelancer
  freelancers.forEach((freelancer, index) => {
    // Add page break if needed
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }
    
    doc.setFontSize(16);
    doc.text(`${index + 1}. ${freelancer.name} - ${freelancer.role}`, 20, yPosition);
    yPosition += 10;
    
    doc.setFontSize(12);
    doc.text(`Status: ${freelancer.availability}`, 25, yPosition);
    yPosition += 10;
    
    doc.text(`Bio: ${freelancer.bio}`, 25, yPosition);
    yPosition += 10;
    
    doc.text('Skills:', 25, yPosition);
    yPosition += 7;
    
    freelancer.skills.forEach(skill => {
      doc.text(`- ${skill}`, 30, yPosition);
      yPosition += 7;
    });
    
    yPosition += 10;
  });
  
  // Add contact info
  doc.text('For more information, contact Rishidar:', 20, yPosition);
  yPosition += 10;
  doc.text('Email: contact@example.com', 20, yPosition);
  yPosition += 10;
  doc.text('Phone: +1 (123) 456-7890', 20, yPosition);
  
  // Save the PDF
  doc.save('team_profile.pdf');
};
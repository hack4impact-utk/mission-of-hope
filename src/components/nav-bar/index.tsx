'use client';

import { useState } from 'react';
import { Box, Button, Divider, Collapse } from '@mui/material';
import {
  AddBox,
  Assignment,
  Email,
  Equalizer,
  ExpandLess,
  ExpandMore,
  Group,
  HandshakeRounded,
  Inventory,
  MiscellaneousServices,
  VolunteerActivism,
} from '@mui/icons-material';
import Image from 'next/image';

export default function Navbar() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const handleToggle = (section: string) => {
    setExpandedSection((prev) => (prev === section ? null : section)); // Toggle the clicked section
  };

  const buttonStyles: React.CSSProperties = {
    color: '#ff8a65',
    fontSize: '15px',
    textTransform: 'none',
    justifyContent: 'flex-start',
    width: '100%',
    padding: '10px 10px',
  };

  const sections = [
    {
      title: 'Donations',
      icon: <VolunteerActivism />,
      buttons: [
        {
          href: '/donation/add',
          icon: <AddBox />,
          label: 'Add Donation',
        },
        {
          href: '/donation',
          icon: <VolunteerActivism />,
          label: 'Donations',
        },
        { href: '/donors', icon: <HandshakeRounded />, label: 'Donors' },
      ],
    },
    {
      title: 'Inventory',
      icon: <Inventory />,
      buttons: [
        { href: '/donationItem', icon: <Inventory />, label: 'Inventory' },
        { href: '/item/add', icon: <AddBox />, label: 'Add Evaluation' },
        { href: '/item', icon: <Assignment />, label: 'Evaluations' },
      ],
    },
    {
      title: 'Reporting & Settings',
      icon: <MiscellaneousServices />,
      buttons: [
        { href: '/mailMerge', icon: <Email />, label: 'Emails' },
        { href: '/user', icon: <Group />, label: 'Users' },
        { href: '#', icon: <Equalizer />, label: 'Reports' },
      ],
    },
  ];

  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      width="33vh" // Fix width of the navbar
      overflow="hidden" // Prevent any expanding overflow
      bgcolor="white" // Set background color explicitly
      borderRight="1px solid #ddd"
    >
      {/* Logo Section */}
      <Box display="flex" justifyContent="center" p={2}>
        <Image
          alt="logo"
          src="/cropped-MOH-Logo-768x393.png"
          width="200"
          height="102"
          className="rounded-md"
        />
      </Box>

      {/* Button Groups */}
      {sections.map((section, index) => (
        <Box key={index} width="100%">
          {/* Section Header */}
          <Button
            onClick={() => handleToggle(section.title)}
            startIcon={section.icon} // Add icon here
            endIcon={
              expandedSection === section.title ? (
                <ExpandLess />
              ) : (
                <ExpandMore />
              )
            }
            style={{ ...buttonStyles, fontWeight: 'bold' }}
          >
            {section.title}
          </Button>

          {/* Sub-buttons (Expandable) */}
          <Collapse
            in={expandedSection === section.title} // Expand only the selected section
            timeout="auto"
            unmountOnExit
          >
            <Box display="flex" flexDirection="column" pl={2}>
              {section.buttons.map((btn, btnIndex) => (
                <Button
                  key={btnIndex}
                  href={btn.href}
                  startIcon={btn.icon}
                  style={{
                    ...buttonStyles,
                    paddingLeft: '10px', // Indent sub-buttons
                    fontSize: '14px', // Smaller font for sub-buttons
                  }}
                >
                  {btn.label}
                </Button>
              ))}
            </Box>
          </Collapse>
          <Divider flexItem />
        </Box>
      ))}

      {/* Vertical Divider */}
      <Divider orientation="vertical" flexItem />
    </Box>
  );
}

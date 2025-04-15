'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
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
import logo from '/public/cropped-MOH-Logo-768x393.png';

// Reusable buttonStyles
const buttonStyles: React.CSSProperties = {
  color: '#ff8a65',
  textTransform: 'none',
  justifyContent: 'flex-start',
  width: '100%',
  padding: '10px 10px',
};

// Menu of the Navbar
const sections = [
  {
    title: 'Donations',
    icon: <VolunteerActivism />,
    buttons: [
      { href: '/donation/add', icon: <AddBox />, label: 'Add Donation' },
      { href: '/donation', icon: <VolunteerActivism />, label: 'Donations' },
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
      { href: '/settings/users', icon: <Group />, label: 'Users' },
      { href: '#', icon: <Equalizer />, label: 'Reports' },
    ],
  },
];

export default function Navbar() {
  const pathname = usePathname();

  const findDefaultExpandedSection = () => {
    if (pathname === '/') return null;
    for (const section of sections) {
      if (section.buttons.some((btn) => btn.href.startsWith(pathname))) {
        return section.title;
      }
    }
    return null;
  };

  const [expandedSection, setExpandedSection] = useState<string | null>(
    findDefaultExpandedSection()
  );

  // Expand or Collapse sub-buttons
  const handleToggle = (section: string) => {
    setExpandedSection((prev) => (prev === section ? null : section));
  };

  return (
    // The Box container of the Navbar
    <Box
      flexDirection="column"
      width="17vw"
      height="100vh"
      position="sticky" // always stays at top
      top={0}
      borderRight="1px solid #ddd"
    >
      {/* Logo Section */}
      <Box display="flex" justifyContent="center" p={2}>
        <Button href="/">
          <Box
            style={{
              width: '100%', // Responsive width
              maxWidth: '200px', // Increase this will make nav-bar wider but still responsive
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Image
              priority={true}
              alt="logo"
              src={logo}
              style={{
                width: '100%',
                height: 'auto',
              }}
              className="rounded-md"
            />
          </Box>
        </Button>
      </Box>

      {/* Section Groups */}
      {sections.map((section, index) => (
        <Box key={index} width="100%">
          {/* Section Header */}
          <Button
            onClick={() => handleToggle(section.title)}
            style={{
              ...buttonStyles,
              fontWeight: 'bold',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            {/* StartIcon and Text are left-alignment */}
            <Box display="flex" alignItems="center" gap={1}>
              {section.icon} {/* StartIcon */}
              <span>{section.title}</span> {/* Button text */}
            </Box>

            {/* EndIcon is right-alignment */}
            {expandedSection === section.title ? (
              <ExpandLess />
            ) : (
              <ExpandMore />
            )}
          </Button>

          {/* Expand only the selected subSection */}
          <Collapse in={expandedSection === section.title}>
            <Box display="flex" flexDirection="column" pl={2}>
              {section.buttons.map((btn, btnIndex) => (
                <Box key={btnIndex} width="100%">
                  <Button
                    key={btnIndex}
                    href={btn.href}
                    startIcon={btn.icon}
                    style={{
                      ...buttonStyles,
                      marginLeft: '5%', // Indent sub-section
                    }}
                  >
                    {btn.label}
                  </Button>
                </Box>
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

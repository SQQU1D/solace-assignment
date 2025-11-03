import React, { Component } from 'react';

import propTypes from 'prop-types';
import Image from 'next/image';

import { styles } from './styles';
import profilePic from './assets/profile.png';
import { LABEL_EXPERIENCE, LABEL_SPECIALTY_COUNT, LABEL_CONTACT } from './constants';

export default class Advocate extends Component {
  static propTypes = propTypes;

  nameplate() {
    const { firstName, lastName, city, degree } = this.props;
    const degreeText = degree ? `(${degree})` : '';
    const fullName = `${firstName} ${lastName} ${degreeText}`;
    return (
      <div>
        <p style={styles.nameText}>{fullName}</p>
        <p style={styles.label}>{city}</p>
      </div>
    );
  }

  experience() {
    const { yearsOfExperience } = this.props;
    if (!yearsOfExperience) {
      return null;
    }
    const text = `${LABEL_EXPERIENCE} ${yearsOfExperience}`;
    return <p style={styles.label}>{text}</p>;
  }

  contact() {
    const { phoneNumber } = this.props;
    if (!phoneNumber) {
      return null;
    }
    const text = `${LABEL_CONTACT} ${phoneNumber}`;
    return <p style={styles.label}>{text}</p>;
  }

  specialties() {
    const { specialties = [] } = this.props;
    if (!specialties || !specialties.length) {
      return null;
    }
    const text = `${LABEL_SPECIALTY_COUNT} ${specialties.length}`;
    const modalText = specialties.join('\n');
    const onClick = () => alert(modalText);
    return (
      <p style={styles.labelUnderline} onClick={onClick}>
        {text}
      </p>
    );
  }

  photo() {
    return <Image src={profilePic} style={styles.profilePic} alt={'pic'} />;
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.left}>{this.photo()}</div>
        <div style={styles.right}>
          {this.nameplate()}
          {this.experience()}
          {this.specialties()}
          {this.contact()}
        </div>
      </div>
    );
  }
}

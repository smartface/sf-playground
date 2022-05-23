export function calendarThemeGenerator(): any {
  const boxColor = 'rgba(255,255,255,1)';
  const mainText = 'rgba(19,41,84,1.0)';
  const mainText40 = 'rgba(19,41,84,0.4)';
  const mainText50 = 'rgba(19,41,84,0.5)';
  const iconsSecondary = 'rgba(183,196,221,1)';
  const separator = 'rgba(237,243,253,1)';
  return {
    '#calendar': {
      flexProps: {
        direction: 'LTR'
      },
      '&_line1': {},
      '&_line2': {},
      '&_navbar_monthLabel': {
        textColor: mainText,
        font: {
          size: 17,
          family: 'SFProText',
          bold: false,
          italic: false
        },
        '&-tomonth': {
          font: {
            size: 17,
            family: 'SFProText',
            bold: true,
            italic: false
          }
        }
      }
    },
    '.calendar': {
      direction: 'LTR',
      '&-self': {
        direction: 'LTR',
        right: 0,
        left: 0,
        top: 0,
        backgroundColor: boxColor,
        flexProps: {
          positionType: 'ABSOLUTE',
          alignContent: 'STRETCH',
          alignItems: 'STRETCH'
        }
      },
      '&_calendarYear': {
        '&_yearLabel': {
          textColor: '#FF001F'
        }
      },
      '&_line': {
        height: 1,
        backgroundColor: separator
      },
      '.header': {
        '&_navbar': {
          direction: 'LTR',
          '&_monthLabel': {},
          '&_arrow': {
            textColor: iconsSecondary,
            backgroundColor: 'rgba(255,255,255,0)',
            bottom: 0,
            flexProps: {
              positionType: 'ABSOLUTE'
            },
            width: 50,
            top: 0,
            font: {
              size: 18,
              family: 'FontAwesome5FreeSolid',
              style: null,
              bold: false,
              italic: false
            },
            textAlignment: 'MIDCENTER'
          },
          '&_label': {
            textColor: mainText
          },
          flexProps: {
            flexDirection: 'ROW',
            positionType: 'RELATIVE'
          },
          height: 40,
          backgroundColor: boxColor
        },
        '&_dayNames': {
          direction: 'LTR',
          backgroundColor: boxColor,
          height: 30,
          '&-lang_ar': {
            direction: 'RTL'
          },
          '&-lang_ar-sa': {
            direction: 'RTL'
          },
          '&_dayName': {
            height: null,
            font: {
              size: 12,
              family: 'Arial'
            },
            '.weekday': {
              textColor: mainText,
              flexProps: {
                positionType: 'RELATIVE',
                flexGrow: 1,
                alignSelf: 'STRETCH'
              },
              textAlignment: 'MIDCENTER'
            },
            '.weekend': {
              textColor: mainText50
            }
          },
          flexProps: {
            flexDirection: 'ROW',
            positionType: 'RELATIVE'
          }
        }
      },
      '.body': {
        '&-tomonth': {},
        flexProps: {
          positionType: 'RELATIVE',
          alignSelf: 'STRETCH',
          flexGrow: 1
        },
        backgroundColor: boxColor
      },
      '.weekRow': {
        direction: 'LTR',
        backgroundColor: boxColor,
        '&-lang_ar-sa': {
          direction: 'RTL'
        },
        '&-lang_ar': {
          direction: 'RTL'
        },
        '&_line': {
          bottom: 0,
          left: 0,
          positionType: 'ABSOLUTE',
          right: 0,
          height: 1,
          backgroundColor: separator
        },
        flexProps: {
          alignContent: 'STRETCH',
          alignItems: 'STRETCH',
          flexDirection: 'ROW',
          positionType: 'RELATIVE'
        },
        height: 40
      },
      '.day': {
        flexProps: {
          alignContent: 'STRETCH',
          alignItems: 'STRETCH',
          flexDirection: 'ROW',
          positionType: 'RELATIVE',
          flexGrow: 1
        },
        borderWidth: 0,
        '&-selected': {
          backgroundColor: 'rgba(125,213,48,1)'
        },
        backgroundColor: 'rgba(246,7,7,0)'
      },
      '.day_label': {
        backgroundColor: 'rgba(255,255,255,0)',
        textColor: mainText,
        flexProps: {
          alignSelf: 'FLEX_START',
          positionType: 'RELATIVE'
        },
        top: 0,
        height: 39,
        minWidth: 40,
        flexGrow: 1,
        borderRadius: 0,
        marginBottom: 2,
        marginRight: 0,
        borderWidth: 0,
        font: {
          size: 14,
          bold: true,
          italic: false,
          family: 'Arial',
          style: 'b'
        },
        '&-rangeSelected': {
          textColor: 'rgba(255,255,255,1)',
          backgroundColor: 'rgba(130,159,214,0)'
        },
        '&_label': {},
        '&-inrange': {
          textColor: '#000000'
        },
        '&-today': {
          borderColor: '#FF001F',
          borderWidth: 1,
          textColor: mainText,
          marginRight: 1,
          font: {
            size: 14,
            family: 'SFProText',
            bold: true,
            italic: false,
            style: 'Bold'
          }
        },
        '&-selected': {
          borderWidth: 0,
          backgroundColor: 'rgba(125,213,48,1)',
          textColor: mainText
        },
        '&-deactiveDays': {
          borderWidth: 0,
          textColor: mainText40
        },
        '&-specialDay': {
          borderWidth: 0,
          backgroundColor: 'rgba(255, 200, 13, 1)'
        },
        '&-weekend': {
          borderWidth: 0,
          textColor: mainText
        }
      },
      '.weekNav': {
        flex: {
          positionType: 0,
          flexGrow: 1,
          flexDirection: 2,
          flexWrap: 1
        },
        flexProps: {
          positionType: 'RELATIVE',
          flexDirection: 'ROW'
        }
      }
    },
    '.calendarWeekly': {
      flexProps: {
        positionType: 'RELATIVE'
      },
      height: 100
    },
    '.onePersonAway': {
      backgroundColor: 'rgba(130,159,214,1)'
    },
    '.multiplePersonsAway': {
      backgroundColor: 'rgba(255,200,13,1)'
    },
    '.specialDay': {
      backgroundColor: 'rgba(222,222,222,1)'
    }
  };
}

/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List, { ListSubheader, ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { GridList, GridListTile } from 'material-ui/GridList';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import TootCard from './toot';
import TootButton from './tootButton';
import Icon from 'material-ui/Icon';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import ButtonBase from 'material-ui/ButtonBase';
import Tooltip from 'material-ui/Tooltip';
import { red, lime, green, lightGreen, pink, yellow, orange, amber } from 'material-ui/colors';

const drawerWidth = 240;

const styles = theme => ({
  root: {
      width: '100%',
      height: '100%',
    zIndex: 1,
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    position: 'absolute',
    zIndex: theme.zIndex.navDrawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
    list: {
        flex: "none",
    },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
      transition: theme.transitions.create(['color'], {
          easing: theme.transitions.easing.ease,
          duration: theme.transitions.duration.longest,
      }),
      '&:hover': {
          color: theme.palette.primary.A100,
      },
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'fixed',
    height: '100%',
      width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
      overflowX: 'hidden',
  },
  drawerPaperClose: {
    width: 60,
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  drawerInner: {
    // Make the items inside not wrap when transitioning:
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: 24,
    height: 'calc(100% - 48px)',
      marginTop: 48,
      //marginLeft: 60,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 48px)',
      marginTop: 48,
    },
  },
    flex: {
        flex: 1,
    },
    titleButton: {
        textTransform: 'none',
        borderRadius: 64,
        '&:hover': {
            backgroundColor: 'inherit',
            color: theme.palette.primary.A100,
        },
        transition: theme.transitions.create(['color'], {
            easing: theme.transitions.easing.ease,
            duration: theme.transitions.duration.longest,
        }),
    },
});

class MiniDrawer extends React.Component {
  state = {
      open: false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };


  render() {
      const classes = this.props.classes;

      const sampleToot = {"id":3831242,"created_at":"2017-09-18T11:59:50.428Z","in_reply_to_id":3802074,"in_reply_to_account_id":1,"sensitive":false,"spoiler_text":"","visibility":"public","language":"en","uri":"https://trunk.mad-scientist.club/users/algernon/statuses/3831242","content":"\u003cp\u003eCurrent state of the prototype (all mockups): \u003c/p\u003e\u003cp\u003eTimeline view: \u003ca href=\"https://trunk.mad-scientist.club/media/2gxuCLyH2Tn6CZYxf-8\" rel=\"nofollow noopener\" target=\"_blank\"\u003e\u003cspan class=\"invisible\"\u003ehttps://\u003c/span\u003e\u003cspan class=\"ellipsis\"\u003etrunk.mad-scientist.club/media\u003c/span\u003e\u003cspan class=\"invisible\"\u003e/2gxuCLyH2Tn6CZYxf-8\u003c/span\u003e\u003c/a\u003e\u003cbr /\u003eToot compose window: \u003ca href=\"https://trunk.mad-scientist.club/media/Uw9xvF0fAdUXY7ijFZQ\" rel=\"nofollow noopener\" target=\"_blank\"\u003e\u003cspan class=\"invisible\"\u003ehttps://\u003c/span\u003e\u003cspan class=\"ellipsis\"\u003etrunk.mad-scientist.club/media\u003c/span\u003e\u003cspan class=\"invisible\"\u003e/Uw9xvF0fAdUXY7ijFZQ\u003c/span\u003e\u003c/a\u003e\u003c/p\u003e\u003cp\u003eThe timeline view is nice, I\u0026apos;m liking it. The compose window needs some tweaking, but we\u0026apos;re getting there.\u003c/p\u003e","url":"https://trunk.mad-scientist.club/@algernon/3831242","reblogs_count":6,"favourites_count":8,"reblog":null,"application":null,"account":{"id":1,"username":"algernon","acct":"algernon","display_name":"Gergely Nagy 🐁","locked":false,"created_at":"2017-04-09T09:06:49.708Z","note":"\u003cp\u003eA tiny mouse, a hacker | 🏷 \u003ca href=\"https://trunk.mad-scientist.club/tags/keyboard\" class=\"mention hashtag\" rel=\"tag\"\u003e#\u003cspan\u003ekeyboard\u003c/span\u003e\u003c/a\u003e, \u003ca href=\"https://trunk.mad-scientist.club/tags/firmware\" class=\"mention hashtag\" rel=\"tag\"\u003e#\u003cspan\u003efirmware\u003c/span\u003e\u003c/a\u003e, \u003ca href=\"https://trunk.mad-scientist.club/tags/clojure\" class=\"mention hashtag\" rel=\"tag\"\u003e#\u003cspan\u003eclojure\u003c/span\u003e\u003c/a\u003e, \u003ca href=\"https://trunk.mad-scientist.club/tags/hy\" class=\"mention hashtag\" rel=\"tag\"\u003e#\u003cspan\u003ehy\u003c/span\u003e\u003c/a\u003e, \u003ca href=\"https://trunk.mad-scientist.club/tags/emacs\" class=\"mention hashtag\" rel=\"tag\"\u003e#\u003cspan\u003eemacs\u003c/span\u003e\u003c/a\u003e  | \u003ca href=\"https://trunk.mad-scientist.club/tags/followme\" class=\"mention hashtag\" rel=\"tag\"\u003e#\u003cspan\u003efollowme\u003c/span\u003e\u003c/a\u003e | 🏠 \u003ca href=\"https://asylum.madhouse-project.org/\" rel=\"nofollow noopener\" target=\"_blank\"\u003e\u003cspan class=\"invisible\"\u003ehttps://\u003c/span\u003e\u003cspan class=\"\"\u003easylum.madhouse-project.org/\u003c/span\u003e\u003cspan class=\"invisible\"\u003e\u003c/span\u003e\u003c/a\u003e | 🔒 \u003ca href=\"https://keybase.io/algernon\" rel=\"nofollow noopener\" target=\"_blank\"\u003e\u003cspan class=\"invisible\"\u003ehttps://\u003c/span\u003e\u003cspan class=\"\"\u003ekeybase.io/algernon\u003c/span\u003e\u003cspan class=\"invisible\"\u003e\u003c/span\u003e\u003c/a\u003e\u003c/p\u003e","url":"https://trunk.mad-scientist.club/@algernon","avatar":"https://trunk.mad-scientist.club/system/accounts/avatars/000/000/001/original/e54cf895c79a893c.jpg?1491732083","avatar_static":"https://trunk.mad-scientist.club/system/accounts/avatars/000/000/001/original/e54cf895c79a893c.jpg?1491732083","header":"https://trunk.mad-scientist.club/system/accounts/headers/000/000/001/original/c2f7a6718ad958ff.jpg?1505479763","header_static":"https://trunk.mad-scientist.club/system/accounts/headers/000/000/001/original/c2f7a6718ad958ff.jpg?1505479763","followers_count":136,"following_count":136,"statuses_count":772},"media_attachments":[{"id":278684,"type":"image","url":"https://trunk.mad-scientist.club/system/media_attachments/files/000/278/684/original/4abe59b20006b5fe.png?1505735848","preview_url":"https://trunk.mad-scientist.club/system/media_attachments/files/000/278/684/small/4abe59b20006b5fe.png?1505735848","remote_url":"","text_url":"https://trunk.mad-scientist.club/media/2gxuCLyH2Tn6CZYxf-8","meta":{"original":{"width":960,"height":1080,"size":"960x1080","aspect":0.8888888888888888},"small":{"width":356,"height":400,"size":"356x400","aspect":0.89}}},{"id":278685,"type":"image","url":"https://trunk.mad-scientist.club/system/media_attachments/files/000/278/685/original/1be520e07214a553.png?1505735881","preview_url":"https://trunk.mad-scientist.club/system/media_attachments/files/000/278/685/small/1be520e07214a553.png?1505735881","remote_url":"","text_url":"https://trunk.mad-scientist.club/media/Uw9xvF0fAdUXY7ijFZQ","meta":{"original":{"width":960,"height":1080,"size":"960x1080","aspect":0.8888888888888888},"small":{"width":356,"height":400,"size":"356x400","aspect":0.89}}}],"mentions":[],"tags":[]};
      const sampleToot2 = {"id":3842390,"created_at":"2017-09-18T23:30:13.668Z","in_reply_to_id":3840973,"in_reply_to_account_id":1,"sensitive":false,"spoiler_text":"","visibility":"public","language":"en","uri":"https://trunk.mad-scientist.club/users/algernon/statuses/3842390","content":"\u003cp\u003eGoing to bed now, but before I do so, a glimpse at where my \u003ca href=\"https://trunk.mad-scientist.club/tags/mastodon\" class=\"mention hashtag\" rel=\"tag\"\u003e#\u003cspan\u003eMastodon\u003c/span\u003e\u003c/a\u003e client mockups are: \u003ca href=\"https://trunk.mad-scientist.club/media/0onZayUcy1NUxND7W2c\" rel=\"nofollow noopener\" target=\"_blank\"\u003e\u003cspan class=\"invisible\"\u003ehttps://\u003c/span\u003e\u003cspan class=\"ellipsis\"\u003etrunk.mad-scientist.club/media\u003c/span\u003e\u003cspan class=\"invisible\"\u003e/0onZayUcy1NUxND7W2c\u003c/span\u003e\u003c/a\u003e\u003c/p\u003e\u003cp\u003eBy the way, the code is up on GitHub at \u003ca href=\"https://github.com/algernon/mad-tooter\" rel=\"nofollow noopener\" target=\"_blank\"\u003e\u003cspan class=\"invisible\"\u003ehttps://\u003c/span\u003e\u003cspan class=\"\"\u003egithub.com/algernon/mad-tooter\u003c/span\u003e\u003cspan class=\"invisible\"\u003e\u003c/span\u003e\u003c/a\u003e. It is an ugly mess, code-wise, but hey, it isn\u0026apos;t even a prototype, just a proof of concept of the design.\u003c/p\u003e\u003cp\u003eWhile I like that the boost/fav/mention and the source chips are now hideable, I feel like this should be a global toggle. But I\u0026apos;m not sure... it makes sense to have them per-toot, too. Perhaps both?\u003c/p\u003e","url":"https://trunk.mad-scientist.club/@algernon/3842390","reblogs_count":0,"favourites_count":0,"reblog":null,"application":null,"account":{"id":1,"username":"algernon","acct":"algernon","display_name":"Gergely Nagy 🐁","locked":false,"created_at":"2017-04-09T09:06:49.708Z","note":"\u003cp\u003eA tiny mouse, a hacker | 🏷 \u003ca href=\"https://trunk.mad-scientist.club/tags/keyboard\" class=\"mention hashtag\" rel=\"tag\"\u003e#\u003cspan\u003ekeyboard\u003c/span\u003e\u003c/a\u003e, \u003ca href=\"https://trunk.mad-scientist.club/tags/firmware\" class=\"mention hashtag\" rel=\"tag\"\u003e#\u003cspan\u003efirmware\u003c/span\u003e\u003c/a\u003e, \u003ca href=\"https://trunk.mad-scientist.club/tags/clojure\" class=\"mention hashtag\" rel=\"tag\"\u003e#\u003cspan\u003eclojure\u003c/span\u003e\u003c/a\u003e, \u003ca href=\"https://trunk.mad-scientist.club/tags/hy\" class=\"mention hashtag\" rel=\"tag\"\u003e#\u003cspan\u003ehy\u003c/span\u003e\u003c/a\u003e, \u003ca href=\"https://trunk.mad-scientist.club/tags/emacs\" class=\"mention hashtag\" rel=\"tag\"\u003e#\u003cspan\u003eemacs\u003c/span\u003e\u003c/a\u003e  | \u003ca href=\"https://trunk.mad-scientist.club/tags/followme\" class=\"mention hashtag\" rel=\"tag\"\u003e#\u003cspan\u003efollowme\u003c/span\u003e\u003c/a\u003e | 🏠 \u003ca href=\"https://asylum.madhouse-project.org/\" rel=\"nofollow noopener\" target=\"_blank\"\u003e\u003cspan class=\"invisible\"\u003ehttps://\u003c/span\u003e\u003cspan class=\"\"\u003easylum.madhouse-project.org/\u003c/span\u003e\u003cspan class=\"invisible\"\u003e\u003c/span\u003e\u003c/a\u003e | 🔒 \u003ca href=\"https://keybase.io/algernon\" rel=\"nofollow noopener\" target=\"_blank\"\u003e\u003cspan class=\"invisible\"\u003ehttps://\u003c/span\u003e\u003cspan class=\"\"\u003ekeybase.io/algernon\u003c/span\u003e\u003cspan class=\"invisible\"\u003e\u003c/span\u003e\u003c/a\u003e\u003c/p\u003e","url":"https://trunk.mad-scientist.club/@algernon","avatar":"https://trunk.mad-scientist.club/system/accounts/avatars/000/000/001/original/e54cf895c79a893c.jpg?1491732083","avatar_static":"https://trunk.mad-scientist.club/system/accounts/avatars/000/000/001/original/e54cf895c79a893c.jpg?1491732083","header":"https://trunk.mad-scientist.club/system/accounts/headers/000/000/001/original/c2f7a6718ad958ff.jpg?1505479763","header_static":"https://trunk.mad-scientist.club/system/accounts/headers/000/000/001/original/c2f7a6718ad958ff.jpg?1505479763","followers_count":136,"following_count":136,"statuses_count":772},"media_attachments":[{"id":279427,"type":"image","url":"https://trunk.mad-scientist.club/system/media_attachments/files/000/279/427/original/f91d762f4b101c0c.png?1505777175","preview_url":"https://trunk.mad-scientist.club/system/media_attachments/files/000/279/427/small/f91d762f4b101c0c.png?1505777175","remote_url":"","text_url":"https://trunk.mad-scientist.club/media/0onZayUcy1NUxND7W2c","meta":{"original":{"width":960,"height":1080,"size":"960x1080","aspect":0.8888888888888888},"small":{"width":356,"height":400,"size":"356x400","aspect":0.89}}}],"mentions":[],"tags":[{"name":"mastodon","url":"https://trunk.mad-scientist.club/tags/mastodon"}]};

      const sampleToot3 = {"id":3849086,"created_at":"2017-09-19T09:43:20.862Z","in_reply_to_id":null,"in_reply_to_account_id":null,"sensitive":false,"spoiler_text":"","visibility":"public","language":"en","uri":"https://trunk.mad-scientist.club/users/algernon/statuses/3849086","content":"\u003cp\u003eLets have a toot that mentions \u003cspan class=\"h-card\"\u003e\u003ca href=\"https://trunk.mad-scientist.club/@algernon\" class=\"u-url mention\"\u003e@\u003cspan\u003ealgernon\u003c/span\u003e\u003c/a\u003e\u003c/span\u003e and \u003cspan class=\"h-card\"\u003e\u003ca href=\"https://mastodon.social/@algernon\" class=\"u-url mention\"\u003e@\u003cspan\u003ealgernon\u003c/span\u003e\u003c/a\u003e\u003c/span\u003e too, so I can test my work-in-progress client.\u003c/p\u003e\u003cp\u003e\u003ca href=\"https://trunk.mad-scientist.club/tags/testing\" class=\"mention hashtag\" rel=\"tag\"\u003e#\u003cspan\u003etesting\u003c/span\u003e\u003c/a\u003e\u003c/p\u003e","url":"https://trunk.mad-scientist.club/@algernon/3849086","reblogs_count":0,"favourites_count":0,"reblog":null,"application":null,"account":{"id":1,"username":"algernon","acct":"algernon","display_name":"Gergely Nagy 🐁","locked":false,"created_at":"2017-04-09T09:06:49.708Z","note":"\u003cp\u003eA tiny mouse, a hacker | 🏷 \u003ca href=\"https://trunk.mad-scientist.club/tags/keyboard\" class=\"mention hashtag\" rel=\"tag\"\u003e#\u003cspan\u003ekeyboard\u003c/span\u003e\u003c/a\u003e, \u003ca href=\"https://trunk.mad-scientist.club/tags/firmware\" class=\"mention hashtag\" rel=\"tag\"\u003e#\u003cspan\u003efirmware\u003c/span\u003e\u003c/a\u003e, \u003ca href=\"https://trunk.mad-scientist.club/tags/clojure\" class=\"mention hashtag\" rel=\"tag\"\u003e#\u003cspan\u003eclojure\u003c/span\u003e\u003c/a\u003e, \u003ca href=\"https://trunk.mad-scientist.club/tags/hy\" class=\"mention hashtag\" rel=\"tag\"\u003e#\u003cspan\u003ehy\u003c/span\u003e\u003c/a\u003e, \u003ca href=\"https://trunk.mad-scientist.club/tags/emacs\" class=\"mention hashtag\" rel=\"tag\"\u003e#\u003cspan\u003eemacs\u003c/span\u003e\u003c/a\u003e  | \u003ca href=\"https://trunk.mad-scientist.club/tags/followme\" class=\"mention hashtag\" rel=\"tag\"\u003e#\u003cspan\u003efollowme\u003c/span\u003e\u003c/a\u003e | 🏠 \u003ca href=\"https://asylum.madhouse-project.org/\" rel=\"nofollow noopener\" target=\"_blank\"\u003e\u003cspan class=\"invisible\"\u003ehttps://\u003c/span\u003e\u003cspan class=\"\"\u003easylum.madhouse-project.org/\u003c/span\u003e\u003cspan class=\"invisible\"\u003e\u003c/span\u003e\u003c/a\u003e | 🔒 \u003ca href=\"https://keybase.io/algernon\" rel=\"nofollow noopener\" target=\"_blank\"\u003e\u003cspan class=\"invisible\"\u003ehttps://\u003c/span\u003e\u003cspan class=\"\"\u003ekeybase.io/algernon\u003c/span\u003e\u003cspan class=\"invisible\"\u003e\u003c/span\u003e\u003c/a\u003e\u003c/p\u003e","url":"https://trunk.mad-scientist.club/@algernon","avatar":"https://trunk.mad-scientist.club/system/accounts/avatars/000/000/001/original/e54cf895c79a893c.jpg?1491732083","avatar_static":"https://trunk.mad-scientist.club/system/accounts/avatars/000/000/001/original/e54cf895c79a893c.jpg?1491732083","header":"https://trunk.mad-scientist.club/system/accounts/headers/000/000/001/original/c2f7a6718ad958ff.jpg?1505479763","header_static":"https://trunk.mad-scientist.club/system/accounts/headers/000/000/001/original/c2f7a6718ad958ff.jpg?1505479763","followers_count":136,"following_count":136,"statuses_count":773},"media_attachments":[],"mentions":[{"id":3,"username":"algernon","url":"https://mastodon.social/@algernon","acct":"algernon@mastodon.social"},{"id":1,"username":"algernon","url":"https://trunk.mad-scientist.club/@algernon","acct":"algernon"}],"tags":[{"name":"testing","url":"https://trunk.mad-scientist.club/tags/testing"}]};

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar className={classNames(classes.appBar, this.state.open && classes.appBarShift)} color="primary">
            <Toolbar disableGutters>
              <IconButton
                color="contrast"
                aria-label="open drawer"
                className={classes.menuButton}
                onClick={this.handleDrawerOpen}>
                <Icon>whatshot</Icon>
              </IconButton>
              <div className={classes.flex}>
                <Button color="contrast"
                        className={classes.titleButton}>
                  <Typography type="title" color="inherit" noWrap>
                    Firehose
                  </Typography>
                </Button>
              </div>
              <TextField
                id="search"
                type="search"
                placeholder="Search text..."
                className={classes.textField}
                margin="dense"
                />
              <IconButton color="default">
                <Icon>search</Icon>
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer
            type="temporary"
            classes={{
                paper: classes.drawerPaper
            }}
            open={this.state.open}
          >
            <div className={classes.drawerInner}>
              <div className={classes.drawerHeader}>
                <IconButton onClick={this.handleDrawerClose}>
                  <ChevronLeftIcon />
                </IconButton>
              </div>
            </div>
            <Divider />
            <List className={classes.list}>
              <ListItem button>
                <ListItemIcon>
                  <Icon color="accent">whatshot</Icon>
                </ListItemIcon>
                <ListItemText primary="Firehose" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <Icon>people</Icon>
                </ListItemIcon>
                <ListItemText primary="Mentions" />
              </ListItem>
            </List>
            <Divider />
            <List className={classes.list}>
              <ListItem button>
                <ListItemIcon>
                  <Icon>domain</Icon>
                </ListItemIcon>
                <ListItemText primary="Local timeline" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <Icon>public</Icon>
                </ListItemIcon>
                <ListItemText primary="Federated timeline" />
              </ListItem>
            </List>
            <Divider />
            <List className={classes.list}>
              <ListItem button>
                <ListItemIcon>
                  <Icon>settings</Icon>
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItem>
            </List>
          </Drawer>
          <main className={classes.content}>
            <List className={classes.list} width="100%" dense>
              <ListItem>
                <TootCard toot={sampleToot3} />
              </ListItem>
              <ListItem>
                <TootCard toot={sampleToot2} />
              </ListItem>
              <ListItem>
                <TootCard toot={sampleToot} />
              </ListItem>
            </List>
            <TootButton />
          </main>
        </div>
      </div>
    );
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MiniDrawer);

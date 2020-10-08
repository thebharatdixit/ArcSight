#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <UserNotifications/UserNotifications.h>
//#import <RNCPushNotificationIOS.h>
#import <Firebase.h>
@import Firebase;
//#import "RNFirebaseNotifications.h"
//#import "RNFirebaseMessaging.h"
#import "FirebasePushNotifications.h"
#import "RNFirebaseMessaging.h"


#ifdef FB_SONARKIT_ENABLED
#import <FlipperKit/FlipperClient.h>
#import <FlipperKitLayoutPlugin/FlipperKitLayoutPlugin.h>
#import <FlipperKitUserDefaultsPlugin/FKUserDefaultsPlugin.h>
#import <FlipperKitNetworkPlugin/FlipperKitNetworkPlugin.h>
#import <SKIOSNetworkPlugin/SKIOSNetworkAdapter.h>
#import <FlipperKitReactPlugin/FlipperKitReactPlugin.h>

static void InitializeFlipper(UIApplication *application) {
  FlipperClient *client = [FlipperClient sharedClient];
  SKDescriptorMapper *layoutDescriptorMapper = [[SKDescriptorMapper alloc] initWithDefaults];
  [client addPlugin:[[FlipperKitLayoutPlugin alloc] initWithRootNode:application withDescriptorMapper:layoutDescriptorMapper]];
  [client addPlugin:[[FKUserDefaultsPlugin alloc] initWithSuiteName:nil]];
  [client addPlugin:[FlipperKitReactPlugin new]];
  [client addPlugin:[[FlipperKitNetworkPlugin alloc] initWithNetworkAdapter:[SKIOSNetworkAdapter new]]];
  [client start];
}
#endif

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
#ifdef FB_SONARKIT_ENABLED
  InitializeFlipper(application);
#endif
  
  if ([FIRApp defaultApp] == nil) {
    [FIRApp configure];
  }
  [FirebasePushNotifications configure];

  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"ArcSight"
                                            initialProperties:nil];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
  center.delegate = self;
  if ([UNUserNotificationCenter class] != nil) {
      // iOS 10 or later
      // For iOS 10 display notification (sent via APNS)
      UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
            center.delegate = self;
            [center requestAuthorizationWithOptions:(UNNotificationPresentationOptionBadge | UNNotificationPresentationOptionSound | UNNotificationPresentationOptionAlert) completionHandler:^(BOOL granted, NSError * _Nullable error)
             {
                 if( !error )
                 {
                   dispatch_async(dispatch_get_main_queue(), ^{
                     [[UIApplication sharedApplication] registerForRemoteNotifications];  // required to get the app to do anything at all about push notifications
                     NSLog( @"Push registration success." );
                   });
                 }
                 else
                 {
                     NSLog( @"Push registration FAILED" );
                     NSLog( @"ERROR: %@ - %@", error.localizedFailureReason, error.localizedDescription );
                     NSLog( @"SUGGESTIONS: %@ - %@", error.localizedRecoveryOptions, error.localizedRecoverySuggestion );
                 }
             }];
    } else {
      // iOS 10 notifications aren't available; fall back to iOS 8-9 notifications.
      UIUserNotificationType allNotificationTypes =
      (UIUserNotificationTypeSound | UIUserNotificationTypeAlert | UIUserNotificationTypeBadge);
      UIUserNotificationSettings *settings =
      [UIUserNotificationSettings settingsForTypes:allNotificationTypes categories:nil];
      [application registerUserNotificationSettings:settings];
    }
  [application registerForRemoteNotifications];
  
  return YES;
}

- (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification {
[[FirebasePushNotifications instance] didReceiveLocalNotification:notification];
}


-(void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler{

//Called when a notification is delivered to a foreground app.
  NSDictionary *dictInfo = notification.request.content.userInfo;
NSLog(@"Userinfo %@",notification.request.content.userInfo);
  if ([[[dictInfo objectForKey:@"aps"] objectForKey:@"alert"] objectForKey:@"body"]) {
    [self userDict:notification.request.content.userInfo];
  }
  

completionHandler(UNNotificationPresentationOptionBadge | UNNotificationPresentationOptionSound | UNNotificationPresentationOptionAlert);
}

-(void)userDict:(NSDictionary*) scheduleNotifications {
  UNMutableNotificationContent *content = [UNMutableNotificationContent new];
//  NSMutableDictionary *dict = scheduleNotifications[@"aps"];
  
  content.title = [[[scheduleNotifications objectForKey:@"aps"] objectForKey:@"alert"] objectForKey:@"title"];
  content.body = [[[scheduleNotifications objectForKey:@"aps"] objectForKey:@"alert"] objectForKey:@"body"];
  content.sound = [UNNotificationSound defaultSound];

  UNTimeIntervalNotificationTrigger *trigger = [UNTimeIntervalNotificationTrigger triggerWithTimeInterval:1
                                                                                                  repeats:NO];

  NSString *identifier = @"UYLLocalNotification";
  UNNotificationRequest *request = [UNNotificationRequest requestWithIdentifier:identifier
                                                                        content:content trigger:trigger];

  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
  [center addNotificationRequest:request withCompletionHandler:^(NSError * _Nullable error) {
      if (error != nil) {
          NSLog(@"Something went wrong: %@",error);
      } else {

      }
  }];
  
}



- (void)application:(UIApplication *)application didReceiveRemoteNotification:(nonnull NSDictionary *)userInfo
                                                    fetchCompletionHandler:(nonnull void (^)(UIBackgroundFetchResult))completionHandler{
[[FirebasePushNotifications instance] didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
}

- (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings {

[[RNFirebaseMessaging instance] didRegisterUserNotificationSettings:notificationSettings];
}
//- (void)application:(UIApplication *)application didReceiveRemoteNotification:(nonnull NSDictionary *)userInfo
//fetchCompletionHandler:(nonnull void (^)(UIBackgroundFetchResult))completionHandler{
////  [[RNFirebaseNotifications instance] didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
//}
//
//- (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings {
////  [[RNFirebaseMessaging instance] didRegisterUserNotificationSettings:notificationSettings];
//}

-(void) userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)(void))completionHandler {
 
//  [[RNFirebaseMessaging instance] didReceiveRemoteNotification:response.notification.request.content.userInfo];
  completionHandler();
}

- (void)messaging:(nonnull FIRMessaging *)messaging
didReceiveRegistrationToken:(nonnull NSString *)fcmToken{
  
  NSLog(@"fcmtoken is: %@",fcmToken);
  
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end

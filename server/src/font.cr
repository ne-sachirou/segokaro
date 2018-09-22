@[Link("objc")]
lib ObjC
  type ID = Void*
  type SEL = Void*

  fun msg_send = objc_msgSend(ID, SEL) : ID
  fun sel_register_name = sel_registerName(UInt8*) : SEL
end

@[Link(framework: "CoreFoundation")]
lib CoreFoundation
  alias CFIndex = LibC::Long

  type NSString = Void*
  type NSURL = Void*

  type CFArrayRef = Void*
  type CFDictionaryRef = Void*
  type CFStringRef = Void*
  type CFTypeRef = Void*

  fun array_get_count = CFArrayGetCount(theArray : CFArrayRef) : CFIndex
  fun array_get_value_at_index = CFArrayGetValueAtIndex(theArray : CFArrayRef, idx : CFIndex) : Void*
end

@[Link(framework: "CoreText")]
lib CoreText
  type CTFontCollectionRef = Void*
  type CTFontDescriptorRef = Void*

  $kCTFontCollectionRemoveDuplicatesOption : CoreFoundation::CFDictionaryRef

  $kCTFontFamilyNameAttribute : CoreFoundation::CFStringRef
  $kCTFontNameAttribute : CoreFoundation::CFStringRef
  $kCTFontStyleNameAttribute : CoreFoundation::CFStringRef
  $kCTFontTraitsAttribute : CoreFoundation::CFStringRef
  $kCTFontURLAttribute : CoreFoundation::CFStringRef

  $kCTFontItalicTrait : CoreFoundation::CFStringRef
  $kCTFontMonoSpaceTrait : CoreFoundation::CFStringRef
  $kCTFontSymbolicTrait : CoreFoundation::CFStringRef
  $kCTFontWeightTrait : CoreFoundation::CFStringRef
  $kCTFontWidthTrait : CoreFoundation::CFStringRef

  fun font_collection_create_from_available_fonts = CTFontCollectionCreateFromAvailableFonts(
    options : CoreFoundation::CFDictionaryRef
  ) : CTFontCollectionRef
  fun font_collection_create_matching_font_descriptors = CTFontCollectionCreateMatchingFontDescriptors(
    collection : CTFontCollectionRef
  ) : CoreFoundation::CFArrayRef
  fun font_descriptor_copy_attributes = CTFontDescriptorCopyAttributes(
    descriptor : CTFontDescriptorRef
  ) : CoreFoundation::CFDictionaryRef
  fun font_descriptor_copy_attribute = CTFontDescriptorCopyAttribute(
    descriptor : CTFontDescriptorRef,
    attribute : CoreFoundation::CFStringRef
  ) : CoreFoundation::CFTypeRef
end

class NSString
  def initialize(@orig : CoreFoundation::NSString*)
  end

  def to_s : String
    selector = ObjC.sel_register_name("UTF8String")
    String.new ObjC.msg_send(@orig.as(ObjC::ID), selector).as(UInt8*)
  end
end

class CTFontDescriptor
  def initialize(@orig : CoreText::CTFontDescriptorRef)
  end

  def name : String
    ns_string = CoreText
      .font_descriptor_copy_attribute(@orig, CoreText.kCTFontNameAttribute).as(CoreFoundation::NSString*)
    NSString.new(ns_string).to_s
  end
end

class Font
  def self.installed : Array(String)
    collection = CoreText
      .font_collection_create_from_available_fonts CoreText.kCTFontCollectionRemoveDuplicatesOption
    cf_array = CoreText.font_collection_create_matching_font_descriptors collection
    (0..CoreFoundation.array_get_count(cf_array) - 1).map do |i|
      descriptor = CTFontDescriptor
        .new CoreFoundation.array_get_value_at_index(cf_array, i).as(CoreText::CTFontDescriptorRef)
      descriptor.name
    end
  end
end

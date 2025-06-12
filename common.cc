// Add these includes at the top
#include <atomic>
#include <cmath>

// Copyright 2013 Lovell Fuller and others.
// SPDX-License-Identifier: Apache-2.0

#include <cstdlib>
#include <cstring>     // use <cstring> instead of <string.h>
#include <string>
#include <vector>
#include <queue>
#include <map>
#include <mutex>       // NOLINT(build/c++11)

#include <napi.h>
#include <vips/vips8>

#include "common.h"

using vips::VImage;

namespace sharp {

  /*
    Get copy of embedded profile.
  */
  std::pair<char*, size_t> GetProfile(VImage image) {
    std::pair<char*, size_t> icc(nullptr, 0);
    if (HasProfile(image)) {
      size_t length = 0;
      const void* data = image.get_blob(VIPS_META_ICC_NAME, &length);
      if (data && length > 0) {
        icc.first = static_cast<char*>(g_malloc(length));
        if (icc.first) {
          icc.second = length;
          std::memcpy(icc.first, data, length);
        }
      }
    }
    return icc;
  }

  /*
    Calculate the (left, top) coordinates of the output image
    within the input image, applying the given gravity during an embed.

    @Azurebyte: We are basically swapping the inWidth and outWidth, inHeight and outHeight from the CalculateCrop function.
  */
  std::tuple<int, int> CalculateEmbedPosition(
      int const inWidth, int const inHeight,
      int const outWidth, int const outHeight, int const gravity) {

    int left = 0;
    int top = 0;

    switch (gravity) {
      case 1: // North
        left = (outWidth - inWidth) / 2;
        break;
      case 2: // East
        left = outWidth - inWidth;
        top = (outHeight - inHeight) / 2;
        break;
      case 3: // South
        left = (outWidth - inWidth) / 2;
        top = outHeight - inHeight;
        break;
      case 4: // West
        top = (outHeight - inHeight) / 2;
        break;
      case 5: // Northeast
        left = outWidth - inWidth;
        break;
      case 6: // Southeast
        left = outWidth - inWidth;
        top = outHeight - inHeight;
        break;
      case 7: // Southwest
        top = outHeight - inHeight;
        break;
      case 8: // Northwest
        break; // Default is 0,0
      default: // Centre
        left = (outWidth - inWidth) / 2;
        top = (outHeight - inHeight) / 2;
    }

    return std::make_tuple(left, top);
  }

  /*
    Calculate the (left, top) coordinates of the output image
    within the input image, applying the given x and y offsets.
  */
  std::tuple<int, int> CalculateCrop(
      int const inWidth, int const inHeight,
      int const outWidth, int const outHeight,
      int const x, int const y) {

    int left = std::clamp(x, 0, std::max(0, inWidth - outWidth));
    int top = std::clamp(y, 0, std::max(0, inHeight - outHeight));

    return std::make_tuple(left, top);
  }

}  // namespace sharp

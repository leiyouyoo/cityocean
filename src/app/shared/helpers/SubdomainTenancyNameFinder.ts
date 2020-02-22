import { FormattedStringValueExtracter } from '@shared/helpers/FormattedStringValueExtracter';
import { AppConsts } from 'src/app/common/AppConsts';

/**
 * 租户名称解析器
 *
 * @export
 * @class SubdomainTenancyNameFinder
 */
export class SubdomainTenancyNameFinder {

    /**
     * 从子级域名解析出租户名称
     *
     * @param {string} rootAddress
     * @returns {string}
     * @memberof SubdomainTenancyNameFinder
     */
    getCurrentTenancyNameOrNull(rootAddress: string): string {
        if (rootAddress.indexOf(AppConsts.tenancyNamePlaceHolderInUrl) < 0) {
            // 网站不支持子域租户名称
            return null;
        }

        const currentRootAddress = document.location.href;

        const formattedStringValueExtracter = new FormattedStringValueExtracter();
        const values: any[] = formattedStringValueExtracter.IsMatch(currentRootAddress, rootAddress);
        if (!values.length) {
            return null;
        }

        return values[0];
    }
}
